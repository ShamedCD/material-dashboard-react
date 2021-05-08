import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "components/Logo/Logo";
import Title from "components/Title/Title";
import ComboBox from "components/Autocomplete/ComboBox";
import Copyright from "components/Copyright/Copyright";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import InventoryCard from "components/Card/InventoryCard";
import { Button } from "@material-ui/core";
import Selector from "components/Autocomplete/Selector";

// This will start empty
const opts = [
  {
    id: 1,
    name: "Jeringa",
    code: "1994-1121-2021-2102",
    label: "1994-1121-2021-2102: Jeringa",
    image: "https://www.jeringasyagujas.com/72-large_default/jeringas-de-5-ml-con-aguja-g21-de-08-mm-x-40.jpg",
  },
  {
    id: 2,
    name: "Guantes de latex",
    code: "1972-1121-2021-2103",
    label: "1972-1121-2021-2103: Guantes de latex",
    image: "https://images-na.ssl-images-amazon.com/images/I/51X6FbyYCKL._AC_SY450_PIbundle-100,TopRight,0,0_SH20_.jpg",
  },
  {
    id: 3,
    name: "Electrocardiograma",
    code: "1974-1121-2021-2104",
    label: "1974-1121-2021-2104: Electrocardiograma",
    image: "https://st.depositphotos.com/1616496/2602/i/950/depositphotos_26025909-stock-photo-defibrillator.jpg",
  },
  {
    id: 4,
    name: "Cable de monitor de signos vitales",
    code: "2008-1121-2021-2105",
    label: "1974-1121-2021-2105: Cable de monitor de signos vitales",
    image: "https://img.medicalexpo.es/images_me/photo-m2/76060-4057747.jpg",
  },
  {
    id: 5,
    name: "Paracetamol",
    code: "1957-1121-2021-2106",
    label: "1974-1121-2021-2106: Paracetamol",
    image: "https://s1.eestatic.com/2016/03/19/actualidad/actualidad_110751227_129370730_1706x960.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: "100%",
  },
  itemContainer: {
    width: "100%",
    paddingTop: "20px",
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 220,
    marginTop: "10px",
    alignContent: "center",
  },
}));

export default function Welcome() {
  const [catgOpts, setCatgOpts] = useState(opts);
  const [haveLastSearch, setHaveLastSearch] = useState(false);

  const classes = useStyles();

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
    setHaveLastSearch(true);
  }

  const RequestButton = (
    <Button size="small" color="primary">
      Solicitar
    </Button>
  );
  const AddButton = (
    <Button size="small" color="primary">
      Añadir
    </Button>
  );

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        {!haveLastSearch && <Logo />}
        {!haveLastSearch && <Title text="Bienvenido al Catálogo del IMSS" />}
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
            <GridItem xs={12} sm={8} md={9}>
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
            {haveLastSearch && (
              <GridItem xs={12} sm={4} md={3}>
                <Selector
                  attributes={{
                    id: "medical-area",
                    label: "Filtrar por área",
                  }}
                  behaviour={{
                    key: "area",
                    defaultValue: {
                      name: "area",
                      id: "area-selector",
                    },
                    options: [
                      <option key="" aria-label="None" value="" />,
                      <option key="urgency" value="urgency">
                        Urgencias
                      </option>,
                      <option key="uci" value="uci">
                        UCI
                      </option>,
                      <option key="iq" value="iq">
                        Quirofanos (QX)
                      </option>,
                    ],
                  }}
                />
              </GridItem>
            )}
            {haveLastSearch && (
              <GridItem xs={12} sm={4} md={3}>
                <Selector
                  attributes={{
                    id: "medical-supply",
                    label: "Filtrar por equipo médico",
                  }}
                  behaviour={{
                    key: "supply",
                    defaultValue: {
                      supply: "",
                      id: "medical-supply",
                    },
                    options: [
                      <option key="" aria-label="None" value="" />,
                      <option key="anestecy" value="anestecy">
                        Máquina de anestesia
                      </option>,
                      <option key="vitalSigns" value="vitalSigns">
                        Monitor de signos vitales
                      </option>,
                      <option
                        key="electrocardiograph"
                        value="electrocardiograph"
                      >
                        Electrocardiógrafo
                      </option>,
                    ],
                  }}
                />
              </GridItem>
            )}
          </GridContainer>
        </div>
        {haveLastSearch && (
          <div id="item-container" className={classes.itemContainer}>
            <GridContainer>
              {catgOpts.map((item, index) => {
                const name = item?.name;
                const code = item?.code;
                return (
                  <GridItem key={index} xs={12} sm={12} md={4}>
                    <InventoryCard
                      attribute={{
                        title: name,
                        body_device: "Monitor de signos vitales",
                        body_model: "NS",
                        body_code: code,
                        available_units: 5,
                        image: item?.image,
                      }}
                      param={{
                        request_button: () => RequestButton,
                        add_button: () => AddButton,
                      }}
                    />
                  </GridItem>
                );
              })}
            </GridContainer>
          </div>
        )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
