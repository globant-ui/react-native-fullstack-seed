import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import jwt from 'express-jwt';
import expressLogging from 'express-logging';
import logger from 'logops';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

import schema from './src/models/schema';
import { JWT_SECRET, SERVER_PORT, DB_URL } from './src/config';

const server = express();

server.use('*', cors({ origin: `http://localhost:${SERVER_PORT}` }));

server.use('/graphql', jwt({
  secret: JWT_SECRET,
  requestProperty: 'auth',
  credentialsRequired: false,
}));

server.use('/graphql', function (req, res, done) {
  if (req.auth) {
    User.findById(req.auth.id).then(
      (user) => {
        req.context = {
          user: user
        };
        done();
      },
      (error) => done(error)
    );
  } else {
    done();
  }
});

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: schema,
  graphiql: true,
  pretty: true,
  formatError: error => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path,
  }),
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${SERVER_PORT}/subscriptions`
}));

server.use(expressLogging(logger));

// Wrap the Express server
const ws = createServer(server);
ws.listen(SERVER_PORT, () => {
  console.log(`Apollo Server is now running on http://localhost:${SERVER_PORT}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
  mongoose.connect(DB_URL);
});