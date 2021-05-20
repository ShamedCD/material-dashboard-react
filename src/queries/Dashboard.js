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
  topThreePurchases: gql`
    query ChartTopThreePurchases($month: String!, $year: String!) {
      topPurchases(month: $month, year: $year) {
        labels
        series {
          meta
          value
        }
      }
    }
  `,
  suppliesByService: gql`
    query PieSuppliesByService($idSupply: Number!) {
      suppliesByService(idSupply: $idSupply) {
        series {
          meta
          value
        }
      }
    }
  `,
};
