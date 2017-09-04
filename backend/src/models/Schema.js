// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema
  } from 'graphql';

import {
  UserQueries,
  UserMutations,
  } from './user/UserQL';

import {
  TestQueries,
  } from './test/TestQL';

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    // User
    user: UserQueries.user,
    users: UserQueries.users,

    // Test
    packages: TestQueries.packages
  })
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // User
    addUser: UserMutations.addUser,
    login: UserMutations.login,
  })
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

export default schema;