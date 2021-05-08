import { gql } from "@apollo/client/core";

export default {
  loginAccount: gql`
    query GetUserLogin($card: String!, $password: String!) {
      loginAccount(card: $card, password: $password) {
        uuid
        name
        paternal
        maternal
        urls
      }
    }
  `,
};
