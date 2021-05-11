import { gql } from "@apollo/client/core";

export default {
  createMemorandum: gql`
    mutation CreateMemorandum(
      $folio: String!
      $asunto: String!
      $requestedBy: String!
      $requestedAt: Date!
      $items: [CreatePurchaseSubCommand!]
    ) {
      createPurchaseOrder(
        folio: $folio
        asunto: $asunto
        requestedBy: $requestedBy
        requestedAt: $requestedAt
        items: $items
      )
    }
  `,
  confirmMemorandum: gql`
    mutation ConfirmMemorandum(
      $id: ID!
      $confirmedAt: Date!
      $confirmedBy: String!
    ) {
      confirmPurchaseOrder(
        id: $id
        confirmedAt: $confirmedAt
        confirmedBy: $confirmedBy
      )
    }
  `,
  fetchMemorandums: gql`
    query FetchMemorandums($take: Float, $skip: Float, $status: String) {
      fetchPurchaseOrders(take: $take, skip: $skip, status: $status) {
        items {
          id
          folio
          asunto
          status
          requestedAt
          requestedBy
          confirmedAt
          confirmedBy
        }
        count
      }
    }
  `,
  getMemorandum: gql`
    query GetMemorandum($id: Number) {
      getPurchaseOrder(id: 1) {
        id
        folio
        asunto
        status
        requestedAt
        requestedBy
        confirmedAt
        confirmedBy
        items {
          id
          idSupply
          qty
        }
      }
    }
  `,
};
