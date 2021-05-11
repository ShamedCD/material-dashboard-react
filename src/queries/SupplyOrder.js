import { gql } from "@apollo/client/core";

export default {
  createVale: gql`
    mutation CreateVale(
      $idService: Float!
      $folio: String!
      $type: String!
      $nivelSuministro: String!
      $grupoSuministro: String!
      $nivelAtencion: String!
      $requestedBy: String!
      $requestedAt: DateTime!
      $items: [CreateSupplySubCommand!]!
    ) {
      createSupplyOrder(
        input: {
          idService: $idService
          folio: $folio
          type: $type
          nivelSuministro: $nivelSuministro
          grupoSuministro: $grupoSuministro
          nivelAtencion: $nivelAtencion
          requestedBy: $requestedBy
          requestedAt: $requestedAt
          items: $items
        }
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
      $idService: Float
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
    query GetVale($id: Float!) {
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
