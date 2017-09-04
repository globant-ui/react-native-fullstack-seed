import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import TokenType from './TokenTypeQL';
import UserType from './UserTypeQL';

import User from './UserSchema';


export default {
  addUser: {
    type: UserType,
    args: {
      firstname: {
        name:'firstname',
        type: new GraphQLNonNull(GraphQLString)
      },
      lastname: {
        name:'lastname',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: User.add
  },
  login: {
    type: UserType,
    args: {
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      }
    },
    resolve: User.login
  }
};