import { gql } from "@apollo/client";

export const MUTATION_REFRESH_USER_TOKEN = gql`
  mutation RefreshUserToken($refreshToken: String) {
    refreshUserToken(refresh_token: $refreshToken) {
      access_token
      refresh_token
    }
  }
`;

export const MUTATION_LOGIN = gql`
  mutation Login($input: LoginPayload) {
    login(input: $input) {
      access_token
      refresh_token
    }
  }
`;
