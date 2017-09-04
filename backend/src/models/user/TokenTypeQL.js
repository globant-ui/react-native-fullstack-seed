import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
  } from 'graphql';

export default new GraphQLObjectType({
  name: 'Token',
  description: 'A token',
  fields: () => ({
    token: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});