import { gql } from "@apollo/client/core";

export default {
  catServices: gql`
    query {
      catServices {
        id
        name
      }
    }
  `,
};
