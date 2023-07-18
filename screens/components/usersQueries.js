import { gql } from "@apollo/client";

export const USER_ORDERS = gql`
  query Orders($userId: UUID) {
    getOrderByUserId(userId: $userId) {
      id
      date
      status
      bookings {
        id
        startDate
        endDate
        price
      }
    }
  }
`;