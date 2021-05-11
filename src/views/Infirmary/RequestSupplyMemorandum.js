import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  Button,
  Paper,
  Snackbar,
  TextField,
  Divider,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Table from "components/Table/Table.js";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Title from "components/Title/Title";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import ComboBox from "components/Autocomplete/ComboBox";
import SpringModal from "components/Modal/SpringModal";
import NewMemorandumPreview from "components/Infirmary/NewMemorandumPreview";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SupplyQueries from "queries/Supply.js";
import PurchaseOrderQueries from "queries/PurchaseOrder.js";
import useToken from "components/App/useToken";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    flexDirection: "column",
    alignItems: "center",
  },
  addButton: {
    color: "green",
    verticalAlign: "middle",
  },
  deleteButton: {
    color: "red",
    verticalAlign: "middle",
  },
  root: {
    margin: "20px",
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "right",
  },
  previewButtons: {
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    margin: theme.spacing(0),
    marginTop: "10px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function processData(data) {
  const cat = data?.searchSupplies?.items?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      code: item.code,
      // cpm: item.cpm,
      label: `${item.code}: ${item.name}`,
      // image: "https://www.jeringasyagujas.com/72-large_default/jeringas-de-5-ml-con-aguja-g21-de-08-mm-x-40.jpg",
    };
  });

  return cat;
}

export default function RequestSupplyMemorandum() {
  const classes = useStyles();
  const { token } = useToken();
  let [catgOpts, setCatgOpts] = useState([]);
  const [requestData] = useState({
    createdAt: new Date().toLocaleDateString(),
    delegacion: "24 QROO",
    unidadMedica: "HGOP#07",
    items: [],
  });
  const [rowTable] = useState([]);
  const [rowTablePreview] = useState([]);
  const [newRow, setNewRow] = useState({});
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const { data = { searchSupplies: [] }, refetch: refetchSupplies } = useQuery(
    SupplyQueries.searchSupplies
  );

  const [
    registerEntry,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(PurchaseOrderQueries.createMemorandum);

  if (data?.searchSupplies?.items) {
    catgOpts = processData(data);
  }

  async function persisRequest() {
    try {
      await registerEntry({
        variables: {
          folio: requestData.folio,
          asunto: requestData.asunto,
          requestedBy: token,
          requestedAt: requestData.createdAt,
          items: requestData.items.map((item) => {
            return {
              idSupply: item[0],
              qty: parseInt(item[4]),
            };
          }),
        },
      });
      window.location.reload();
    } catch (e) {
      setOpen(false);
      console.info(e.message);
      window.location.reload();
    }
  }

  const Content = (
    <NewMemorandumPreview
      attributes={{
        title: "CONFIRMAR NUEVA ORDEN DE COMPRA",
        footer: () => RequestButtons,
      }}
      dataset={{
        dataBody: requestData,
        items: rowTablePreview,
      }}
    />
  );

  const RequestButtons = (
    <div className={classes.previewButtons}>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={persisRequest}
        disabled={mutationLoading}
      >
        Guardar y generar memorandum
      </Button>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={(e) => {
          e && e.preventDefault();
          setOpen(false);
        }}
      >
        Cancelar
      </Button>
    </div>
  );

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  /**
   * Function in charge of updating the status changes for the
   * set of filters available in the selector.
   * @param {Event} e The event source of the callback.
   * @param {string} filter The value to be searched.
   */
  function updateSuppliesOptions(e, filter) {
    e && e.preventDefault();
    const filters = {
      take: 10,
      name: filter,
    };

    refetchSupplies(filters);
    setCatgOpts(processData(data));
  }

  const handleClickOpen = () => {
    if (rowTablePreview.length > 0 && requestData.asunto && requestData.folio) {
      setOpen(true);
    } else {
      setAlertMsg(
        "Debes llenar todos los campos y agregar al menos un articulo para generar la orden."
      );
      setOpenAlert(true);
    }
  };

  const cleanNewRowFields = () => {
    setNewRow({});
  };

  const handleClickDelete = (event) => {
    event.preventDefault();
    // alert(event.target);
    const key = event.target.closest("button").id;
    // console.log(event.target.closest("button").id);
    requestData.items.find((item, index) => {
      if (item && item.includes(key)) {
        requestData.items.splice(index, 1);
      }
    });
  };

  const handleClickAdd = () => {
    if (!newRow.id || !newRow.itemQty || newRow.itemQty < 1) {
      setAlertMsg("¡Error! Debe especificar nombre y cantidad del articulo.");
      setOpenAlert(true);
    } else {
      // Para alamacenar en base de datos
      requestData.items.push([
        newRow.id,
        newRow.itemName,
        newRow.code,
        newRow.cpm,
        String(newRow.itemQty),
      ]);

      // Para pintar en la tabla principal
      rowTable.push([
        newRow.itemName,
        newRow.code,
        newRow.cpm,
        String(newRow.itemQty),
        <Button
          key={newRow.code}
          id={newRow.id}
          className={classes.deleteButton}
          color="default"
          onClick={handleClickDelete}
        >
          <DeleteForeverIcon />
        </Button>,
      ]);

      // Para pintar en la tabla preview
      rowTablePreview.push([
        newRow.code,
        newRow.itemName,
        newRow.cpm,
        String(newRow.itemQty),
      ]);

      cleanNewRowFields();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Title text="Generar Nueva Orden de Compra" />
        <Paper>
          <div id="searcher" className={classes.root}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={4}>
                <TextField
                  className={classes.input}
                  id="folio"
                  label="Folio"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(event) => {
                    requestData.folio = event.target.value;
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={8}>
                <TextField
                  className={classes.input}
                  id="subject"
                  label="Asunto"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(event) => {
                    requestData.asunto = event.target.value;
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Divider variant="middle" />
              </GridItem>
              <GridItem xs={12} sm={8} md={8}>
                <ComboBox
                  attributes={{
                    id: "name-searcher",
                    text: "Nombre del articulo",
                  }}
                  behaviour={{
                    response: catgOpts,
                    key: "name",
                  }}
                  handleChange={{
                    handleOptions: updateSuppliesOptions,
                    handleItem: (event, value) => {
                      if (value) {
                        newRow.id = value.id;
                        newRow.itemName = value.name;
                        newRow.code = value.code;
                        newRow.cpm = value.cpm;
                      } else {
                        delete newRow.id;
                        delete newRow.itemName;
                        delete newRow.code;
                        delete newRow.cpm;
                      }
                    },
                  }}
                />
              </GridItem>
              <GridItem xs={10} sm={3} md={3}>
                <TextField
                  id="item-qty"
                  label="Cantidad"
                  type="number"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(event) => {
                    newRow.itemQty = event.target.value;
                  }}
                />
              </GridItem>
              <GridItem xs={2} sm={1} md={1}>
                <Button
                  className={classes.addButton}
                  color="default"
                  onClick={handleClickAdd}
                >
                  <AddCircleIcon />
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Table
                  tableHeaderColor="success"
                  tableHead={[
                    "Artículo",
                    "Clave",
                    "CPM",
                    "Cantidad Solicitada",
                    "Opciones",
                  ]}
                  tableData={rowTable}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    Generar Solicitud
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.reload();
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
          </div>
          <div id="form-container">
            <SpringModal
              attributes={{
                open: open,
                content: () => Content,
              }}
              handleClose={handleClose}
            />
          </div>
          <div id="alerts">
            <Snackbar
              open={openAlert}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
            >
              <Alert onClose={handleCloseAlert} severity="error">
                {alertMsg}
              </Alert>
            </Snackbar>
            <Snackbar open={mutationError} autoHideDuration={6000}>
              <Alert severity="error">
                ¡Ha ocurrido un error! Contacte al administrador.
              </Alert>
            </Snackbar>
            <Backdrop className={classes.backdrop} open={mutationLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar autoHideDuration={6000} open={mutationData}>
              <Alert severity="success">¡Operación exitosa!</Alert>
            </Snackbar>
          </div>
        </Paper>
      </div>
    </Container>
  );
}
