import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { useMutation } from "@apollo/client";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { Form, Field } from "react-final-form";
import { Backdrop, CircularProgress, Grid, Paper } from "@material-ui/core";
import { TextField } from "final-form-material-ui";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import SupplyQueries from "queries/Supply.js";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "green",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formSection: {
    fontSize: 15,
    color: "green",
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "right",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const validate = (values) => {
  // Agregar validacion de campos requeridos y mostrar respectivo mensaje.
  // const errors = {};
  // if (!values.firstName) {
  //   errors.firstName = "Required";
  // }
  // if (!values.lastName) {
  //   errors.lastName = "Required";
  // }
  // if (!values.email) {
  //   errors.email = "Required";
  // }
  // return errors;
};

export default function CreateProduct({ attributes, handleClose }) {
  const classes = useStyles();
  const { title, open, initialValues, Transition } = attributes;

  const [
    addProduct,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(SupplyQueries.createSupply);

  const onSubmit = async (values) => {
    try {
      await addProduct({
        variables: {
          gpo: values.gpo,
          gen: values.gen,
          esp: values.esp,
          dif: values.dif,
          var: values.var,
          cbi: parseInt(values.cbi),
          descripcion: `${values.name} - ${values.make} - ${values.model}`,
          unidadPresentacion: values.unidadPresentacion,
          cantidadPresentacion: parseInt(values.cantidadPresentacion),
          tipoPresentacion: values.tipoPresentacion,
          precioArticulo: parseInt(values.precioArticulo),
          partidaPresupuestal: parseInt(values.partidaPresupuestal),
          inventariables: parseInt(values.inventariables),
          nivelCompra: parseInt(values.nivelCompra),
          linea: values.linea,
          registro: values.registro,
          createdAt: values.createdAt,
        },
      });
      window.location.reload();
    } catch (e) {
      console.info(e.message);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {/* <Button autoFocus color="inherit" type="submit">
            Guardar
          </Button> */}
        </Toolbar>
      </AppBar>
      {mutationError && (
        <Alert severity="error">
          Ha ocurrido un error, intente de nuevo mas tarde.
        </Alert>
      )}
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues ?? {}}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Typography
                className={classes.formSection}
                color="textSecondary"
                gutterBottom
              >
                Clave de producto
              </Typography>
              <GridContainer alignItems="flex-start" spacing={2}>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="gpo"
                    component={TextField}
                    type="text"
                    label="Grupo"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="gen"
                    component={TextField}
                    type="text"
                    label="General"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="esp"
                    component={TextField}
                    type="text"
                    label="Especificación"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="dif"
                    component={TextField}
                    type="text"
                    label="Diferenciador"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="var"
                    component={TextField}
                    type="text"
                    label="Variante"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="cbi"
                    component={TextField}
                    type="number"
                    label="CBI"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
              </GridContainer>
              <Typography
                className={classes.formSection}
                color="textSecondary"
                gutterBottom
              >
                Descripción
              </Typography>
              <GridContainer alignItems="flex-start" spacing={2}>
                <GridItem xs={12} sm={6}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="Nombre"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <Field
                    fullWidth
                    // required
                    name="catgProvider"
                    component={TextField}
                    type="text"
                    label="Número catálogo proveedor"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={6}>
                  <Field
                    fullWidth
                    required
                    name="make"
                    component={TextField}
                    type="text"
                    label="Marca"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={6}>
                  <Field
                    fullWidth
                    required
                    name="model"
                    component={TextField}
                    type="text"
                    label="Modelo"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <Field
                    fullWidth
                    // required
                    name="affiliateTo"
                    component={TextField}
                    type="text"
                    label="Afiliar a"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
              </GridContainer>
              <Typography
                className={classes.formSection}
                color="textSecondary"
                gutterBottom
              >
                Presentación
              </Typography>
              <GridContainer alignItems="flex-start" spacing={2}>
                <GridItem xs={12} sm={6}>
                  <Field
                    fullWidth
                    required
                    name="unidadPresentacion"
                    component={TextField}
                    type="text"
                    label="Unidad"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <Field
                    fullWidth
                    required
                    name="cantidadPresentacion"
                    component={TextField}
                    type="number"
                    label="Cantidad"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={6}>
                  <Field
                    fullWidth
                    required
                    name="tipoPresentacion"
                    component={TextField}
                    type="text"
                    label="Tipo"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
              </GridContainer>
              <Typography
                className={classes.formSection}
                color="textSecondary"
                gutterBottom
              >
                Articulo
              </Typography>
              <GridContainer alignItems="flex-start" spacing={2}>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="precioArticulo"
                    component={TextField}
                    type="number"
                    label="Precio"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="start">MXN</InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="partidaPresupuestal"
                    component={TextField}
                    type="number"
                    label="Partida presupuestal"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="createdAt"
                    component={TextField}
                    type="date"
                    label="Fecha rec."
                    size="small"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="linea"
                    component={TextField}
                    type="text"
                    label="Línea"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="inventariables"
                    component={TextField}
                    type="number"
                    label="Inventariables"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="registro"
                    component={TextField}
                    type="text"
                    label="Registro"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="nivelCompra"
                    component={TextField}
                    type="number"
                    label="Nivel compra"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="status"
                    component={TextField}
                    type="text"
                    label="Estado"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
              </GridContainer>
              <Grid className={classes.buttons} item style={{ marginTop: 16 }}>
                {/* <Button
                  type="button"
                  variant="contained"
                  onClick={reset}
                  disabled={submitting || pristine}
                >
                  Limpiar
                </Button> */}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting || mutationLoading}
                >
                  Guardar
                </Button>
              </Grid>
            </Paper>
          </form>
        )}
      />
      <Backdrop className={classes.backdrop} open={mutationLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={mutationData}>
        <Alert severity="success">¡Operación exitosa!</Alert>
      </Backdrop>
    </Dialog>
  );
}
