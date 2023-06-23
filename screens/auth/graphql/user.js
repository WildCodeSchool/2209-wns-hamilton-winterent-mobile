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
  query User($userId: UUID!) {
    user(id: $userId) {
      id
      email
      firstname
      lastname
      # password
      gender
      birthdate
      phoneNumber
      role {
        id
        role
      }
      address {
        id
        roadNumber
        streetName
        city
        postalCode
        country
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      firstname
      lastname
      # gender
      # birthdate
      # phoneNumber
      # address {
      #   id
      #   roadNumber
      #   streetName
      #   city
      #   postalCode
      #   country
      # }
    }
  }
`;
