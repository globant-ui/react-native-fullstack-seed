import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
  } from 'graphql';

import { compose } from '../../utilities/compose';

import Auth from '../../providers/Auth';

import PostType from './PostTypeQL';
import Post from './PostSchema';

export default {
  getAllPosts: {
    type: new GraphQLList(PostType),
    args: {
      limit: {
        name: 'limit',
        type: new GraphQLNonNull(GraphQLInt)
      },
      offset: {
        name: 'offset',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    // resolve: compose(Auth.authenticated)(Post.getAllPosts)
    resolve: Post.getAllPosts
  },
  getPost: {
    type: PostType,
    args: {
      postId: {
        type: GraphQLString
      }
    },
    // resolve: compose(Auth.authenticated)(Post.getPost)
    resolve: Post.getPost
  }
};
