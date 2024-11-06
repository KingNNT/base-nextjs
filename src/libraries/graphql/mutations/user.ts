import { gql } from "@apollo/client";

export const MUTATION_CREATE_NEW_USER = gql`
  mutation CreateNewUser($input: NewUserPayload) {
    createNewUser(input: $input) {
      id
    }
  }
`;
