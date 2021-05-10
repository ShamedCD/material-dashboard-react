import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useQuery, useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Title from "components/Title/Title";
import ComboBox from "components/Autocomplete/ComboBox";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import InventoryCard from "components/Card/InventoryCard";
import { Button, TextField } from "@material-ui/core";
import SupplyQueries from "queries/Supply.js";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    marginBottom: "30px",
    width: "100%",
  },
  title: {
    marginBottom: "30px",
  },
}));

function processData(data) {
  const cat = data?.searchSupplies?.items?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      code: item.code,
      label: `${item.code}: ${item.name}`,
      // image: "https://www.jeringasyagujas.com/72-large_default/jeringas-de-5-ml-con-aguja-g21-de-08-mm-x-40.jpg",
    };
  });

  return cat;
}

export default function RegisterNewEntry() {
  const classes = useStyles();
  let [newQty, setNewQty] = useState(0);
  let [catgOpts, setCatgOpts] = useState([]);
  const [haveLastSearch, setHaveLastSearch] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [showError, setShowError] = useState(false);

  const { data = { searchSupplies: [] }, refetch: refetchSupplies } = useQuery(
    SupplyQueries.searchSupplies
  );

  const [
    registerEntry,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(SupplyQueries.updateSupply);

  if (data?.searchSupplies?.items) {
    catgOpts = processData(data);
  }

  async function registerNewEntry() {
    if (newQty) {
      setShowError(false);
      try {
        await registerEntry({
          variables: { id: itemSelected.id, qty: newQty },
        });
        setNewQty(0);
        // refetchUsers()
        window.location.reload();
      } catch (e) {
        console.info(e.message);
      }
    } else {
      setShowError(true);
    }
  }
  /**
   * Function in charge of updating the status changes for the
   * set of filters available in the selector.
   * @param {Event} e The event source of the callback.
   * @param {string} filter The value to be searched.
   */
  function updateSuppliesOptions(e, filter) {
    e && e.preventDefault();
    setShowError(false);
    const filters = {
      take: 10,
    };

    if (e.target.id === "name-searcher") {
      filters.name = filter;
    } else if (e.target.id === "name-searcher") {
      filters.code = filter;
    }

    refetchSupplies(filters);
    setCatgOpts(processData(data));
  }

  /**
   * Search for an specific item by key.
   * @param {Event} e The event source of the callback.
   */
  function findSupply(e) {
    e && e.preventDefault();
    setShowError(false);

    const { optionIndex } = e.target.dataset;
    const item = catgOpts[optionIndex];

    setItemSelected(item);
    setHaveLastSearch(true);
  }

  const RequestButton = (
    <TextField
      id="outlined-number"
      label="Cantidad"
      type="number"
      inputRef={newQty}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      onChange={(event) => {
        newQty = event.target.value;
      }}
    />
  );

  const AddButton = (
    <Button
      variant="outlined"
      size="small"
      color="primary"
      onClick={registerNewEntry}
    >
      Agregar
    </Button>
  );

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Title className={classes.title} text="Registrar Nueva Entrada" />
        <div id="searcher" className={classes.root}>
          <GridContainer>
            <GridItem xs={12} sm={4} md={3}>
              <ComboBox
                attributes={{
                  id: "code-searcher",
                  text: "Búsqueda por código",
                }}
                behaviour={{
                  response: catgOpts,
                  key: "code",
                }}
                handleChange={{
                  handleOptions: updateSuppliesOptions,
                  handleItem: findSupply,
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={8} md={6}>
              <ComboBox
                attributes={{
                  id: "name-searcher",
                  text: "Introduzca una palabra clave",
                }}
                behaviour={{
                  response: catgOpts,
                  key: "name",
                }}
                handleChange={{
                  handleOptions: updateSuppliesOptions,
                  handleItem: findSupply,
                }}
              />
            </GridItem>
            {/* <GridItem xs={12} sm={8} md={3}> */}
            {/* <TextField
                id="outlined-number"
                label="Cantidad"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              /> */}
            {/* </GridItem> */}
          </GridContainer>
        </div>
        {haveLastSearch && (
          <GridItem xs={12} sm={12} md={12}>
            <InventoryCard
              attribute={{
                title: itemSelected.name,
                body_device: "",
                body_model: "",
                body_code: itemSelected.code,
                // image:
                //   "https://s1.eestatic.com/2016/03/19/actualidad/actualidad_110751227_129370730_1706x960.jpg",
              }}
              param={{
                request_button: () => RequestButton,
                add_button: () => AddButton,
              }}
            />
          </GridItem>
        )}
        {showError && (
          <Alert severity="error">
            Debe ingresar una cantidad mayor a 0 unidades
          </Alert>
        )}
        {mutationLoading && <Alert severity="info">Cargando...</Alert>}
        {mutationError && (
          <Alert severity="error">
            Error: Intente de nuevo mas tarde o contacte al administrador.
          </Alert>
        )}
        {mutationData && <Alert severity="success">¡Operación exitosa!.</Alert>}
      </div>
    </Container>
  );
}
