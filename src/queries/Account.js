import { gql } from "@apollo/client/core";

export default {
  loginAccount: gql`
    query loginAccount(card: String!, password: String!) {
      id name paternal maternal urls
    }
  `,
};
