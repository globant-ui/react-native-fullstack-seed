import {
  GraphQLList,
  GraphQLID
  } from 'graphql';

import { compose } from '../../utilities/compose';

import UserType from './UserTypeQL';
import User from './UserSchema';

import Auth from '../../providers/Auth';

export default {
  users: {
    type: new GraphQLList(UserType),
    resolve: User.getListOfUsers
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: compose(Auth.authenticated)(User.getUserByPosition)
  }
};
