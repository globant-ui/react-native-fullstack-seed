import gql from 'graphql-tag'

export const POSTS_QUERY = gql`
  query Posts($limit: Int!, $offset: Int!) {
    getAllPosts(limit: $limit, offset: $offset) {
      id
      title
      body
    }
  }`;

export default POSTS_QUERY