import { gql } from "@apollo/client/core";

export default {
  createSupply: gql`
    mutation createSupply() {
      
    }
  `,
  fetchSupplies: gql`
    query fetchSupplies(take: Number!, skip: Number!, code: String?, name: String?) {
      id, name, code, label
    }
  `,
  getSupply: gql`
    query getSupply(id: Number!) {
      gpo
      gen
      esp
      dif
      var
      cbi
      descripcion
      status
      qty
      cpm
      unidadPresentacion
      cantidadPresentacion
      tipoPresentacion
      precioArticulo
      partidaPresupuestal
      inventariables
      nivelCompra
      linea
      registro
      createdAt
      files
    }
  `,
};
