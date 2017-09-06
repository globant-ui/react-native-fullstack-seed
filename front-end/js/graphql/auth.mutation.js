import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt,
      firstname,
      lastname,
      email
    }
  }`;

export default LOGIN_MUTATION;