import { gql } from "@apollo/client/core";

export default {
  createSupplyOrder: gql`
    mutation createSupplyOrder()
  `,
  updateSupplyOrder: gql`
    mutation updateSupplyOrder()
  `,
  deliverSupplyOrder: gql`
    mutation deliverSupplyOrder()
  `,
  fetchSupplyOrders: gql`
    query fetchSupplyOrders()
  `,
};
