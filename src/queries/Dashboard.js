import { gql } from "@apollo/client/core";

export default {
  purchaseByMonth: gql`
    query ChartPurchaseByMonth($code: String!, $year: String!) {
      purchasesPerMonth(code: $code, year: $year) {
        labels
        series {
          meta
          value
        }
      }
    }
  `,
};
