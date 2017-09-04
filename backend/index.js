import express from 'express';
import graphqlHTTP from 'express-graphql';
import jwt from 'express-jwt';
import expressLogging from 'express-logging';
import logger from 'logops';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

import schema from './src/models/schema';
import { JWT_SECRET, SERVER_PORT, DB_URL } from './src/config';

const User = mongoose.model('User');
const app = express();

app.use('/graphql', jwt({
  secret: JWT_SECRET,
  requestProperty: 'auth',
  credentialsRequired: false,
}));
app.use('/graphql', function (req, res, done) {
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
app.use('/graphql', graphqlHTTP({
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

app.use(expressLogging(logger));

app.listen(SERVER_PORT, function () {
  console.log(`Server listening at ${SERVER_PORT}`);
  mongoose.connect(DB_URL);
});
