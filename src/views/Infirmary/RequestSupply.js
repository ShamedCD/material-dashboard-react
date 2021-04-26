import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, Paper, Snackbar, TextField } from "@material-ui/core";
import Table from "components/Table/Table.js";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Title from "components/Title/Title";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import ComboBox from "components/Autocomplete/ComboBox";
import Selector from "components/Autocomplete/Selector";
import SpringModal from "components/Modal/SpringModal";
import NewRequestPreview from "components/Infirmary/NewRequestPreview";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// This will start empty
const opts = [
  {
    id: 1,
    name: "Jeringa",
    code: "1994-1121-2021-2102",
    cpm: "21",
    label: "1994-1121-2021-2102: Jeringa",
    image: "https://www.jeringasyagujas.com/72-large_default/jeringas-de-5-ml-con-aguja-g21-de-08-mm-x-40.jpg",
  },
  {
    id: 2,
    name: "Guantes de latex",
    code: "1972-1121-2021-2103",
    cpm: "12",
    label: "1972-1121-2021-2103: Guantes de latex",
    image: "https://images-na.ssl-images-amazon.com/images/I/51X6FbyYCKL._AC_SY450_PIbundle-100,TopRight,0,0_SH20_.jpg",
  },
  {
    id: 3,
    name: "Electrocardiograma",
    code: "1974-1121-2021-2104",
    cpm: "54",
    label: "1974-1121-2021-2104: Electrocardiograma",
    image: "https://st.depositphotos.com/1616496/2602/i/950/depositphotos_26025909-stock-photo-defibrillator.jpg",
  },
  {
    id: 4,
    name: "Cable de monitor de signos vitales",
    code: "2008-1121-2021-2105",
    cpm: "65",
    label: "1974-1121-2021-2105: Cable de monitor de signos vitales",
    image: "https://img.medicalexpo.es/images_me/photo-m2/76060-4057747.jpg",
  },
  {
    id: 5,
    name: "Paracetamol",
    code: "1957-1121-2021-2106",
    cpm: "76",
    label: "1974-1121-2021-2106: Paracetamol",
    image: "https://s1.eestatic.com/2016/03/19/actualidad/actualidad_110751227_129370730_1706x960.jpg",
  },
];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  addButton: {
    // position: "absolute",
    // right: "5%",
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
}));

export default function RequestSupply() {
  const classes = useStyles();
  const [catgOpts, setCatgOpts] = useState(opts);
  const [requestData] = useState({ items: [] });
  const [rowTable] = useState([]);
  const [rowTablePreview] = useState([]);
  const [isVale, setIsVale] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const Content = (
    <NewRequestPreview
      attributes={{
        title: "CONFIRMAR NUEVA SOLICITUD",
        footer: () => RequestButtons,
      }}
      dataset={{
        reqType: requestData.reqType,
        reqTypeVoucher: requestData.reqTypeVoucher,
        items: rowTablePreview,
      }}
    />
  );

  const RequestButtons = (
    <div className={classes.previewButtons}>
      <Button
        variant="contained"
        size="small"
        color="primary" /*onClick={handleClose}*/
        // onClick={handleClickOpen}
      >
        Guardar y generar vale
      </Button>
      <Button
        variant="contained"
        size="small"
        color="secondary" /*onClick={handleClose}*/
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
    // Actiualizar componentes de supplies
    console.log("Cambio filtro");
  }

  /**
   * Search for an specific item by key.
   * @param {Event} e The event source of the callback.
   */
  function findSupply(e) {
    e && e.preventDefault();

    const { optionIndex } = e.target.dataset;
    const item = catgOpts[optionIndex];

    // setCatgOpts([item]);
  }

  const handleClickOpen = () => {
    // Validar que exista al menos una fila en la tabla
    setOpen(true);
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
      console.log(requestData.items);
      if (item && item.includes(key)) {
        requestData.items.splice(index, 1);
      }
    });
  };

  const handleClickAdd = () => {
    if (!newRow.id || !newRow.itemQty || newRow.itemQty < 1) {
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
        "",
        "",
        "",
        "",
        "",
        "",
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
        <Title text="Generar Nueva Solicitud" />
        <Paper>
          <div id="searcher" className={classes.root}>
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <Selector
                  attributes={{
                    id: "request-type",
                    label: "Tipo de solicitud",
                  }}
                  behaviour={{
                    key: "reqType",
                    defaultValue: {
                      reqType: "",
                      id: "request-type",
                    },
                    options: [
                      <option key="" aria-label="None" value="" />,
                      <option key="vale" value="vale">
                        Vale
                      </option>,
                      <option key="memorandum" value="memorandum">
                        Memorándum de compra
                      </option>,
                    ],
                  }}
                  callback={(target) => {
                    if (target.value == "vale") {
                      setIsVale(true);
                    } else {
                      requestData.reqTypeVoucher = "";
                      setIsVale(false);
                    }

                    requestData.reqType = target.value;
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <Selector
                  attributes={{
                    id: "service-unit",
                    label: "Unidad de servicio solicitante",
                  }}
                  behaviour={{
                    key: "unit",
                    defaultValue: {
                      unit: "",
                      id: "service-unit",
                    },
                    options: [
                      <option key="" aria-label="None" value="" />,
                      <option key="ucin" value="ucin">
                        UCIN
                      </option>,
                      <option key="ucia" value="ucia">
                        Terapia intensica Adultos
                      </option>,
                    ],
                  }}
                />
              </GridItem>
              {/* // Aparece unicamente cuando el tipo de solicitud es vale */}
              {isVale && (
                <GridItem xs={12} sm={6} md={4}>
                  <Selector
                    attributes={{
                      id: "reqType-voucher",
                      label: "Tipo de solicitud en vale",
                    }}
                    behaviour={{
                      key: "type",
                      defaultValue: {
                        type: "",
                        id: "reqType-voucher",
                      },
                      options: [
                        <option key="" aria-label="None" value="" />,
                        <option key="complementary" value="complementary">
                          Complementario
                        </option>,
                        <option key="ordinary" value="ordinary">
                          Ordinario
                        </option>,
                        <option key="extraodinary" value="extraodinary">
                          Extraordinario
                        </option>,
                      ],
                    }}
                    callback={(target) => {
                      requestData.reqTypeVoucher = target.value;
                    }}
                  />
                </GridItem>
              )}
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
                {/* <CustomInput
                  labelText="Cantidad"
                  id="item-qty"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "number",
                    variant: "outlined",
                  }}
                /> */}
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
                  // tableHead={columns}
                  // tableData={rows}
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
                  {/* Agregar validador que se aseguré que los campos minimos esten llenos */}
                  <Button
                    variant="contained"
                    size="small"
                    color="primary" /*onClick={handleClose}*/
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
                      window.location.reload(false);
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
                ¡Error! Debe especificar nombre y cantidad del articulo.
              </Alert>
            </Snackbar>
          </div>
        </Paper>
      </div>
    </Container>
  );
}
