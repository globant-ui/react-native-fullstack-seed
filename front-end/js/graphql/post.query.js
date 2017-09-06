import gql from 'graphql-tag'

export const POST_QUERY = gql`
  query Post($id: String!) {
    getPost(postId: $id) {
      id
      title
      body
    }
  }`;

export default POST_QUERY