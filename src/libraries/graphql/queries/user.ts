import { gql } from "@apollo/client";

export const QUERY_GET_MY_USER_INFORMATION = gql`
  query Query {
    getMyUserInformation
  }
`;
