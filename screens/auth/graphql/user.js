import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation(
    $email: String!
    $firstname: String!
    $password: String!
    $lastname: String
  ) {
    addUser(
      email: $email
      firstname: $firstname
      password: $password
      lastname: $lastname
    ) {
      token
      user {
        email
        id
      }
    }
  }
`;

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

export const USER = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      id
      email
      firstname
      lastname
      password
    }
  }
`;
