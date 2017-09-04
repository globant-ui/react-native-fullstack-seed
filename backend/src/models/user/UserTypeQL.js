import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
  } from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    firstname: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastname: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => ''
    },
    jwt: {
      type: GraphQLString
    },
    version: {
      type: GraphQLString
    }
  })
});