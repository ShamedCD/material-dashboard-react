import React, { useState } from "react";
import { useQuery } from "@apollo/client";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AccountQueries from "queries/Account.js";

import {
  topSuppliesChart,
  purchaseTimeChart,
  purchasesByServiceChart,
  purchaseByMonthChart,
  intakeTimeChart,
  supplyStatusChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import ComboBox from "components/Autocomplete/ComboBox";
import Selector from "components/Autocomplete/Selector";
import DatePicker from "components/Autocomplete/DatePicker";

function UserInfo() {
  const { loading, error, data } = useQuery(AccountQueries.loginAccount, {
    variables: { card: "123456789", password: "123456", address: "imss.gob7" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  const { loginAccount } = data;

  return (
    <div key={loginAccount.uuid}>
      <p>
        {loginAccount.name} {loginAccount.paternal} {loginAccount.maternal}
      </p>
    </div>
  );
}

const useStyles = makeStyles(styles);

function initializeTopSupplies(filters = {}) {
  // Fetch for initial state
  return {
    series: [
      [
        { meta: "paracetamol", value: 5 },
        { meta: "paracetamol", value: 4 },
        { meta: "paracetamol", value: 3 },
        { meta: "paracetamol", value: 7 },
        { meta: "paracetamol", value: 10 },
        { meta: "paracetamol", value: 3 },
        { meta: "paracetamol", value: 4 },
        { meta: "paracetamol", value: 8 },
        { meta: "paracetamol", value: 10 },
        { meta: "paracetamol", value: 6 },
      ],
      [
        { meta: "Ibuprofeno", value: 3 },
        { meta: "Ibuprofeno", value: 2 },
        { meta: "Ibuprofeno", value: 9 },
        { meta: "Ibuprofeno", value: 5 },
        { meta: "Ibuprofeno", value: 4 },
        { meta: "Ibuprofeno", value: 6 },
        { meta: "Ibuprofeno", value: 4 },
        { meta: "Ibuprofeno", value: 6 },
        { meta: "Ibuprofeno", value: 7 },
        { meta: "Ibuprofeno", value: 8 },
      ],
      [
        { meta: "Diclofenaco", value: 2 },
        { meta: "Diclofenaco", value: 4 },
        { meta: "Diclofenaco", value: 5 },
        { meta: "Diclofenaco", value: 7 },
        { meta: "Diclofenaco", value: 1 },
        { meta: "Diclofenaco", value: 4 },
        { meta: "Diclofenaco", value: 3 },
        { meta: "Diclofenaco", value: 3 },
        { meta: "Diclofenaco", value: 1 },
        { meta: "Diclofenaco", value: 6 },
      ],
    ],
    labels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  };
}

function initializePurchaseTime(filters = {}) {
  return {
    labels: [
      "ord-01",
      "ord-02",
      "ord-03",
      "ord-04",
      "ord-04",
      "ord-04",
      "ord-06",
    ],
    series: [[12, 17, 7, 17, 23, 18, 38]],
  };
}

function initializePurchasesByService(filters = {}) {
  return {
    series: [
      { meta: "Quirofano", value: 30 },
      { meta: "Triage", value: 10 },
      { meta: "UCI", value: 60 },
    ],
  };
}

function initializePurchaseByMonth(filters = {}) {
  return {
    labels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    series: [
      [
        { meta: "Medicamentos", value: 5 },
        { meta: "Medicamentos", value: 4 },
        { meta: "Medicamentos", value: 3 },
        { meta: "Medicamentos", value: 7 },
        { meta: "Medicamentos", value: 10 },
        { meta: "Medicamentos", value: 3 },
        { meta: "Medicamentos", value: 4 },
        { meta: "Medicamentos", value: 8 },
        { meta: "Medicamentos", value: 10 },
        { meta: "Medicamentos", value: 6 },
      ],
      [
        { meta: "Instrumentos", value: 3 },
        { meta: "Instrumentos", value: 2 },
        { meta: "Instrumentos", value: 9 },
        { meta: "Instrumentos", value: 5 },
        { meta: "Instrumentos", value: 4 },
        { meta: "Instrumentos", value: 6 },
        { meta: "Instrumentos", value: 4 },
        { meta: "Instrumentos", value: 6 },
        { meta: "Instrumentos", value: 7 },
        { meta: "Instrumentos", value: 8 },
      ],
      [
        { meta: "Materiales de curación", value: 2 },
        { meta: "Materiales de curación", value: 4 },
        { meta: "Materiales de curación", value: 5 },
        { meta: "Materiales de curación", value: 7 },
        { meta: "Materiales de curación", value: 1 },
        { meta: "Materiales de curación", value: 4 },
        { meta: "Materiales de curación", value: 3 },
        { meta: "Materiales de curación", value: 3 },
        { meta: "Materiales de curación", value: 1 },
        { meta: "Materiales de curación", value: 6 },
      ],
    ],
  };
}

function initializeIntakeTime() {
  // Fetch for initial state
  return {
    series: [
      { meta: "Guantes", value: 5 },
      { meta: "Jeringas", value: 4 },
      { meta: "Vendas", value: 2 },
      { meta: "Paracetamol", value: 8 },
      { meta: "Diclofenaco", value: 6 },
    ],
    labels: ["Guantes", "Jeringas", "Vendas", "Paracetamol", "Diclofenaco"],
  };
}

function initializeSupplyStatus() {
  return {
    series: [
      { meta: "Insumos faltantes", value: 14.3 },
      { meta: "Insumos surtidos", value: 85.7 },
    ],
  };
}

function Title({ text }) {
  return (
    <h4 className={useStyles().cardTitle}>
      {text}
      <GetAppRoundedIcon className={useStyles().downloadButton} />
    </h4>
  );
}

function Footer({ date }) {
  return (
    <CardFooter chart>
      <div className={useStyles().stats}>
        <AccessTime /> Última actualización hace {date}.
      </div>
    </CardFooter>
  );
}

export default function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState({
    dashboardOne: "",
    dashboardTwo: "",
    dashboardThree: "",
    dashboardFour: "",
    dashboardFive: "",
    dashboardsix: "",
  });

  // Cambiar nombre "initialize" por nombre comun que soporte filtros otrogados.
  const [topSupplies, setTopSupplies] = useState(initializeTopSupplies());
  const [purchaseTime, setPurchaseTime] = useState(initializePurchaseTime());
  const [purchasesByService, setPurchasesByService] = useState(
    initializePurchasesByService()
  );
  const [purchaseByMonth, setPurchaseByMonth] = useState(
    initializePurchaseByMonth()
  );
  const [intakeTime, setIntakeTime] = useState(initializeIntakeTime());
  const [supplyStatus, setSupplyStatus] = useState(initializeSupplyStatus());
  const classes = useStyles();

  function lastDashboardUpdated(keyword) {
    return lastUpdated[keyword];
  }

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
    // const item = catgOpts[optionIndex];
  }

  // getTopSupplies();

  return (
    <div>
      {/* <UserInfo /> */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={{
                  labels: topSupplies.labels,
                  series: topSupplies.series,
                }}
                type="Bar"
                options={topSuppliesChart.options}
                responsiveOptions={topSuppliesChart.responsiveOptions}
                listener={topSuppliesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <Title text="Top 3 de Insumos mas comprados &emsp;" />
              <p className={classes.cardCategory}>{/* Label */}</p>
            </CardBody>
            <Footer date={lastDashboardUpdated("dashboardOne")} />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={purchaseTime}
                type="Line"
                options={purchaseTimeChart.options}
                listener={purchaseTimeChart.animation}
              />
            </CardHeader>
            <CardBody>
              <Title text="Tiempos de compra &emsp;" />
              <p className={classes.cardCategory}>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={6}>
                    <ComboBox
                      attributes={{
                        id: "code-searcher",
                        text: "Clave del articulo",
                      }}
                      behaviour={{
                        response: [],
                        key: "code",
                      }}
                      handleChange={{
                        handleOptions: updateSuppliesOptions,
                        handleItem: findSupply,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </p>
            </CardBody>
            <Footer date={lastDashboardUpdated("dashboardTwo")} />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                options={purchasesByServiceChart.options}
                data={purchasesByService}
                type="Pie"
                // listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <Title text="Compras de Unidades por Servicio &emsp;" />
              <p className={classes.cardCategory}>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={6}>
                    <ComboBox
                      attributes={{
                        id: "code-searcher",
                        text: "Clave del articulo",
                        style: { width: "100%", paddingTop: "10px" },
                      }}
                      behaviour={{
                        response: [],
                        key: "code",
                      }}
                      handleChange={{
                        handleOptions: updateSuppliesOptions,
                        handleItem: findSupply,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={6}>
                    <Selector
                      attributes={{
                        id: "medical-supply",
                        label: "Filtrar por tiempo",
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
                            Mes
                          </option>,
                          <option key="vitalSigns" value="vitalSigns">
                            Año
                          </option>,
                        ],
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </p>
            </CardBody>
            <Footer date={lastDashboardUpdated("dashboardThree")} />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={purchaseByMonth}
                type="Line"
                options={purchaseByMonthChart.options}
                listener={purchaseByMonthChart.animation}
              />
            </CardHeader>
            <CardBody>
              <Title text="Compras de articulo por mes &emsp;" />
              <p className={classes.cardCategory}>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={6}>
                    <Selector
                      attributes={{
                        id: "medical-supply",
                        label: "Por",
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
                            Grupo
                          </option>,
                          <option key="vitalSigns" value="vitalSigns">
                            Articulo
                          </option>,
                        ],
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={6}>
                    <Selector
                      attributes={{
                        id: "medical-supply",
                        label: "Filtrar por tiempo",
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
                            Mes
                          </option>,
                          <option key="vitalSigns" value="vitalSigns">
                            Año
                          </option>,
                        ],
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={6}>
                    <Selector
                      attributes={{
                        id: "medical-supply",
                        label: "Filtrar por area",
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
                            Urgencias
                          </option>,
                          <option key="vitalSigns" value="vitalSigns">
                            Quirofano
                          </option>,
                        ],
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </p>
            </CardBody>
            <Footer date={lastDashboardUpdated("dashboardFour")} />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={{
                  labels: intakeTime.labels,
                  series: intakeTime.series,
                }}
                type="Bar"
                options={intakeTimeChart.options}
                responsiveOptions={intakeTimeChart.responsiveOptions}
                listener={intakeTimeChart.animation}
              />
            </CardHeader>
            <CardBody>
              <Title text="Tiempo de consumo &emsp;" />
              <p className={classes.cardCategory}>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={6}>
                    <DatePicker
                      attributes={{
                        id: "intake-time-picker",
                        label: "Filtrar por fecha",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={6}>
                    <Selector
                      attributes={{
                        id: "medical-supply",
                        label: "Filtrar por area",
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
                            Urgencias
                          </option>,
                          <option key="vitalSigns" value="vitalSigns">
                            Quirofano
                          </option>,
                        ],
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </p>
            </CardBody>
            <Footer date={lastDashboardUpdated("dashboardFive")} />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                options={supplyStatusChart.options}
                data={supplyStatus}
                type="Pie"
                // listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <Title text="Estado del insumo &emsp;" />
              <p className={classes.cardCategory}>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={6}>
                    <DatePicker
                      attributes={{
                        id: "supply-satus-picker",
                        label: "Filtrar por fecha",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={6}>
                    <ComboBox
                      attributes={{
                        id: "provider-searcher",
                        text: "Proveedor",
                        style: { width: "100%", paddingTop: "10px" },
                      }}
                      behaviour={{
                        response: [],
                        key: "code",
                      }}
                      handleChange={{
                        handleOptions: updateSuppliesOptions,
                        handleItem: findSupply,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </p>
            </CardBody>
            <Footer date={lastDashboardUpdated("dashboardSix")} />
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
