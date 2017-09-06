import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      jwt,
      firstname,
      lastname,
      email
    }
  }`;

export default USER_QUERY;