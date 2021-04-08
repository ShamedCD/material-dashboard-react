import React, { useState, forwardRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, Slide } from "@material-ui/core";
import SupplyList from "components/Inventory/SupplyList";
import CreateProduct from "components/Inventory/CreateProduct";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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

export default function ManageSupplyRecords() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getRows() {
    return [
      [
        "573.230.00a.01",
        "NO G3.1",
        "Circuito de respiración numero catalogo proveedor 1335.",
        "FOO",
        "1",
        "BAR",
        "265.54",
        "1020",
        "06/24/2000",
        "0",
        "3",
        "00",
        "B053518",
      ],
    ];
  }

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
            rows: getRows(),
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
