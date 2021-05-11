import { gql } from "@apollo/client/core";

export default {
  createVale: gql`
    mutation CreateVale(
      $idService: Number!
      $folio: String!
      $type: String!
      $requestedBy: String!
      $requestedAt: Date!
      $items: [CreateSupplySubCommand!]
    ) {
      createSupplyOrder(
        idService: $idService
        folio: $folio
        type: $type
        requestedBy: $requestedBy
        requestedAt: $requestedAt
        items: $items
      )
    }
  `,
  deliverVale: gql`
    mutation DeliverVale(
      $id: ID!
      $deliveredAt: Date!
      $deliveredBy: String!
      $items: [DeliverSupplySubCommand!]
    ) {
      deliverSupplyOrder(
        id: $id
        deliveredAt: $deliveredAt
        deliveredBy: $deliveredBy
        items: $items
      )
    }
  `,
  fetchVales: gql`
    query FetchVales(
      $take: Float
      $skip: Float
      $status: String
      $idService: Number
      $type: String
    ) {
      fetchSupplyOrders(
        take: $take
        skip: $skip
        status: $status
        idService: $idService
        type: $type
      ) {
        items {
          id
          idService
          folio
          type
          nivelAtencion
          nivelSuministro
          grupoSuministro
          status
          requestedAt
          requestedBy
          deliveredAt
          deliveredBy
        }
        count
      }
    }
  `,
  getVale: gql`
    query GetVale($id: Number) {
      getSupplyOrder(id: $id) {
        id
        idService
        folio
        type
        nivelAtencion
        nivelSuministro
        grupoSuministro
        status
        requestedAt
        requestedBy
        deliveredAt
        deliveredBy
        items {
          id
          idSupply
          requestedQty
          deliveredQty
        }
      }
    }
  `,
};
