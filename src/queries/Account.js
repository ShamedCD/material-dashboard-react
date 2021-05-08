import { gql } from "@apollo/client/core";

export default {
  loginAccount: gql`
    query GetUserLogin($card: String!, $password: String!, $address: String!) {
      loginAccount(card: $card, password: $password, address: $address) {
        uuid
        name
        paternal
        maternal
        urls
      }
    }
  `,
};
