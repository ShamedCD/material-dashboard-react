import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Title from "components/Title/Title";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import InventoryCard from "components/Card/InventoryCard";

// This will start empty
const opts = [
  {
    id: 1,
    name: "Jeringa",
    code: "1994-1121-2021-2102",
    label: "1994-1121-2021-2102: Jeringa",
    qty: "6",
    image:
      "https://www.jeringasyagujas.com/72-large_default/jeringas-de-5-ml-con-aguja-g21-de-08-mm-x-40.jpg",
  },
  {
    id: 2,
    name: "Guantes de latex",
    code: "1972-1121-2021-2103",
    label: "1972-1121-2021-2103: Guantes de latex",
    qty: "2",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51X6FbyYCKL._AC_SY450_PIbundle-100,TopRight,0,0_SH20_.jpg",
  },
  {
    id: 3,
    name: "Electrocardiograma",
    code: "1974-1121-2021-2104",
    label: "1974-1121-2021-2104: Electrocardiograma",
    qty: "3",
    image:
      "https://st.depositphotos.com/1616496/2602/i/950/depositphotos_26025909-stock-photo-defibrillator.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  itemContainer: {
    width: "100%",
    paddingTop: "30px",
  },
}));

export default function ProductsLowStock() {
  const classes = useStyles();
  const [catgOpts, setCatgOpts] = useState(opts);

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Title text="Productos En Baja Existencia" />
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
                      remaining_units: item?.qty,
                      image: item?.image,
                    }}
                  />
                </GridItem>
              );
            })}
          </GridContainer>
        </div>
      </div>
    </Container>
  );
}
