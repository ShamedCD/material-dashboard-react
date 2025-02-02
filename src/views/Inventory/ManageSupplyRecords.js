import React, { useState, forwardRef } from "react";
import { useQuery } from "@apollo/client";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, Slide, TablePagination } from "@material-ui/core";
import SupplyList from "components/Inventory/SupplyList";
import CreateProduct from "components/Inventory/CreateProduct";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SupplyQueries from "queries/Supply.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    right: "5%",
    color: "white",
    verticalAlign: "middle",
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function processData(data) {
  const cat = data?.fetchSupplies?.items?.map((item) => {
    return [
      `${item.gpo}.${item.gen}.${item.esp}.${item.dif}.${item.var}`,
      `${item.cbi}`,
      item.descripcion,
      item.unidadPresentacion,
      `${item.cantidadPresentacion}`,
      item.tipoPresentacion,
      `$${item.precioArticulo}`,
      `${item.partidaPresupuestal}`,
      item.createdAt,
      `${item.inventariables}`,
      `${item.nivelCompra}`,
      item.linea,
      item.registro,
    ];
  });

  return cat;
}

export default function ManageSupplyRecords() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  let [rowsPerPage, setRowsPerPage] = useState(10);
  let [itemsFound] = useState(0);
  let [stock] = useState([]);

  const { data = { fetchSupplies: [] }, refetch: refetchSupplies } = useQuery(
    SupplyQueries.fetchSupplies
  );

  if (data?.fetchSupplies?.items) {
    stock = processData(data);
    itemsFound = data?.fetchSupplies?.count ?? 0;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    refetchSupplies({
      take: rowsPerPage,
      skip: parseInt(rowsPerPage) * parseInt(newPage),
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const rpp = parseInt(event.target.value, 10);
    setRowsPerPage(rpp);
    setPage(0);
    refetchSupplies({
      take: rpp,
      skip: parseInt(rpp) * parseInt(page),
    });
  };

  const AddButton = (
    <Button
      className={classes.addButton}
      color="default"
      onClick={handleClickOpen}
    >
      <AddCircleIcon />
    </Button>
  );

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <SupplyList
          attributes={{
            title: "Altas, Bajas y Cambios de Insumos",
            ActionComponent: () => AddButton,
            columns: [
              "Clave",
              "CBI",
              "Descripción",
              "Unidad",
              "Cantidad",
              "Tipo",
              "Precio",
              "Partida presupuestal",
              "Fecha rec.",
              "Inventariables",
              "Nivel Compra",
              "Linea",
              "Registro",
              "Minimo p/alerta",
            ],
            rows: stock,
            itemsFound,
            // eslint-disable-next-line react/display-name
            Pagination: () => (
              <TablePagination
                labelRowsPerPage="Filas por página"
                component="div"
                count={itemsFound}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            ),
          }}
        />
      </div>
      <div id="form-container">
        <CreateProduct
          attributes={{
            title: "Añadir nuevo producto",
            open: open,
            Transition: Transition,
          }}
          handleClose={handleClose}
        />
      </div>
    </Container>
  );
}
