import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Title from "components/Title/Title";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import InfirmaryRequestCard from "components/Card/InfirmaryRequestCard";
import { Button } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SpringModal from "components/Modal/SpringModal";
import NewRequestPreview from "components/Infirmary/NewRequestPreview";

// This will start empty
const opts = [
  {
    type: "Vale",
    area: "UCIN",
    userRole: "Jefe de enfermería",
    userName: "Enf. Silvia Mota",
    // Validar con fecha de creación
    createdAt: true,
  },
  {
    type: "Memorandum",
    area: "UCIA",
    userRole: "Jefe de enfermería",
    userName: "Enf. Silvia Mota",
    // Validar con fecha de creación
    createdAt: true,
  },
  {
    type: "Vale",
    area: "UCIN",
    userRole: "Jefe de enfermería",
    userName: "Enf. Silvia Mota",
    // Validar con fecha de creación
    createdAt: false,
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
  viewButton: {
    textAlign: "center",
  },
}));

function getSupplyRows(items) {
  const stock = [];

  items &&
    items.forEach((item) => {
      stock.push([item.code, item.itemName, item.cpm, "", "", "", "", "", ""]);
    });

  return stock;
}

function findRequestByKey(key) {
  // Call API
  return {
    id: 1,
    reqType: "vale",
    status: "Solicitud Recibida",
    items: [
      {
        id: "1",
        code: "1972-1121-2021-2103",
        itemName: "Guantes de latex",
        cpm: "12",
        itemQty: "24",
      },
    ],
  };
}

export default function RequestHistory() {
  const classes = useStyles();
  const [catgOpts, setCatgOpts] = useState(opts);
  const [open, setOpen] = useState(false);
  const [requestData, setRequestData] = useState({});

  const Content = (
    <NewRequestPreview
      attributes={{
        title: requestData?.reqType?.toUpperCase(),
        subtitle: requestData?.status,
      }}
      dataset={{
        reqType: requestData?.reqType,
        reqTypeVoucher: requestData?.reqTypeVoucher,
        items: getSupplyRows(requestData?.items),
      }}
    />
  );

  const handleClickOpen = (e) => {
    e && e.preventDefault();
    const key = "";
    // Validar que exista al menos una fila en la tabla
    const request = findRequestByKey(key);
    setRequestData(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ViewRequestButton = (
    <Button
      className={classes.viewButton}
      color="primary"
      onClick={handleClickOpen}
    >
      <VisibilityIcon /> Ver
    </Button>
  );

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Title text="Historial de Solicitudes" />
        <div id="item-container" className={classes.itemContainer}>
          <GridContainer>
            {catgOpts.map((item, index) => {
              return (
                <GridItem key={index} xs={12} sm={6} md={4} lg={3}>
                  <InfirmaryRequestCard
                    attribute={{
                      title: item.type,
                      body_type: item.type,
                      body_area: item.area,
                      body_usr_role: item.userRole,
                      body_usr_name: item.userName,
                      // Va a llegar un date, implementar funcion que
                      // valide y regrese true si es del día actual
                      // false si no.
                      is_new: item.createdAt,
                    }}
                    param={{
                      view_request_button: () => ViewRequestButton,
                    }}
                  />
                </GridItem>
              );
            })}
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
      </div>
    </Container>
  );
}
