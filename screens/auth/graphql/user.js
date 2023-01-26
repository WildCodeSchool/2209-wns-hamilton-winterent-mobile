import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Query($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        email
        firstname
        id
      }
    }
  }
`;
