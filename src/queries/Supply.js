import { gql } from "@apollo/client/core";

export default {
  createSupply: gql`
    mutation CreateSupply(
      $gpo: String!
      $gen: String!
      $esp: String!
      $dif: String!
      $var: String!
      $cbi: String!
      $descripcion: String!
      $unidadPresentacion: String!
      $cantidadPresentacion: String!
      $tipoPresentacion: String!
      $precioArticulo: String!
      $partidaPresupuestal: String!
      $inventariables: String!
      $nivelCompra: String!
      $linea: String!
      $registro: String!
      $createdAt: String!
    ) {
      createSupply(
        gpo: $gpo
        gen: $gen
        esp: $esp
        dif: $dif
        var: $var
        cbi: $cbi
        descripcion: $descripcion
        unidadPresentacion: $unidadPresentacion
        cantidadPresentacion: $cantidadPresentacion
        tipoPresentacion: $tipoPresentacion
        precioArticulo: $precioArticulo
        partidaPresupuestal: $partidaPresupuestal
        inventariables: $inventariables
        nivelCompra: $nivelCompra
        linea: $linea
        registro: $registro
        createdAt: $createdAt
      )
    }
  `,
  updateSupply: gql`
    mutation UpdateSupplyNumbers($id: Float!, $qty: Float, $cpm: Float) {
      updateSupply(input: { id: $id, qty: $qty, cpm: $cpm })
    }
  `,
  activateSupply: gql`
    mutation ActivateSupply($id: ID!) {
      activateSupply(id: $id)
    }
  `,
  deactivateSupply: gql`
    mutation ActivateSupply($id: ID!) {
      deactivateSupply(id: $id)
    }
  `,
  searchSupplies: gql`
    query SearchSupplies(
      $take: Float
      $skip: Float
      $code: String
      $name: String
    ) {
      searchSupplies(take: $take, skip: $skip, code: $code, name: $name) {
        items {
          id
          name
          code
          label
        }
        count
      }
    }
  `,
  // searchSupplies: gql`
  //   query SearchSupplies {
  //     searchSupplies {
  //       items {
  //         id
  //         name
  //         code
  //         label
  //       }
  //       count
  //     }
  //   }
  // `,
  fetchSupplies: gql`
    query FetchSupplies($take: Float, $skip: Float, $status: String) {
      fetchSupplies(take: $take, skip: $skip, status: $status) {
        items {
          gpo
          gen
          esp
          dif
          var
          cbi
          descripcion
          status
          qty
          unidadPresentacion
          cantidadPresentacion
          tipoPresentacion
          precioArticulo
          partidaPresupuestal
          inventariables
          nivelCompra
          linea
          registro
        }
        count
      }
    }
  `,
  // fetchSupplies: gql`
  //   query FetchSupplies($take: Float, $skip: Float, $status: String) {
  //     fetchSupplies(take: $take, skip: $skip, status: $status) {
  //       items {
  //         gpo
  //         gen
  //         esp
  //         dif
  //         var
  //         cbi
  //         descripcion
  //         status
  //         qty
  //         cpm
  //         unidadPresentacion
  //         cantidadPresentacion
  //         tipoPresentacion
  //         precioArticulo
  //         partidaPresupuestal
  //         inventariables
  //         nivelCompra
  //         linea
  //         registro
  //         createdAt
  //       }
  //       count
  //     }
  //   }
  // `,
  getSupply: gql`
    query GetSupply($id: ID!) {
      getSupply(id: $id) {
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
    }
  `,
};
