import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "@material-ui/core/Button";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import InventoryCard from "components/Card/InventoryCard";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <InventoryCard
            attribute={{
              title: "Cable ECG",
              body_device: "Monitor de signos vitales",
              body_model: "NS",
              body_code: "AAA-0000-1111",
              available_units: 5,
            }}
            param={{
              request_button: () => RequestButton,
              add_button: () => AddButton,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <InventoryCard
            attribute={{
              title: "Cable ECG",
              body_device: "Monitor de signos vitales",
              body_model: "NS",
              body_code: "AAA-0000-1111",
              remaining_units: 5,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <InventoryCard
            attribute={{
              title: "Cable ECG",
              body_device: "Monitor de signos vitales",
              body_model: "NS",
              body_code: "AAA-0000-1111",
            }}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
