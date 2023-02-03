import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($user: CreateUser!) {
    addUser(user: $user) {
      user {
        id
        firstname
        email
      }
      token
    }
  }
`;

export const LOGIN = gql`
  query Query($user: LoginUser!) {
    login(user: $user) {
      user {
        id
        firstname
        email
      }
      token
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
