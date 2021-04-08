import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { Form, Field } from "react-final-form";
import { Grid, Paper } from "@material-ui/core";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from "react-router-dom";

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
}));

const onSubmit = async (values) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};

export default function CreateProduct({ attributes, handleClose }) {
  const classes = useStyles();
  const { title, open, Transition } = attributes;

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
          <Button autoFocus color="inherit" onClick={handleClose}>
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: "larry" }}
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
                    name="group"
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
                    name="general"
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
                    name="specification"
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
                    name="differentiator"
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
                    name="variant"
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
                    type="text"
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
                    required
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
                    required
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
                    name="unit"
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
                    name="quantity"
                    component={TextField}
                    type="text"
                    label="Cantidad"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={6}>
                  <Field
                    fullWidth
                    required
                    name="type"
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
                    name="amount"
                    component={TextField}
                    type="text"
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
                    name="budgetItem"
                    component={TextField}
                    type="text"
                    label="Partida presupuestal"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="dateRec"
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
                    name="line"
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
                    name="inventories"
                    component={TextField}
                    type="text"
                    label="Inventariables"
                    size="small"
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs={6} sm={4} md={2}>
                  <Field
                    fullWidth
                    required
                    name="register"
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
                    name="purchaseLevel"
                    component={TextField}
                    type="text"
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
            </Paper>
          </form>
        )}
      />
      {/* <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Default notification ringtone"
            secondary="Tethys"
          />
        </ListItem>
      </List> */}
    </Dialog>
  );
}
