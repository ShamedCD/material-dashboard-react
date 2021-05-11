import React, { useState } from "react";
import { useQuery } from "@apollo/client";
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
import SupplyOrderQueries from "queries/SupplyOrder.js";

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

function processData(data) {
  const cat = data?.fetchSupplyOrders?.items?.map((item) => {
    return {
      id: item.id,
      type: item.type,
      folio: item.folio,
    };
  });

  return cat;
}

function getSupplyRows(items) {
  const stock = [];

  items &&
    items.forEach((item) => {
      stock.push([item.code, item.itemName, item.cpm, "", "", "", "", "", ""]);
    });

  return stock;
}

export default function VoucherHistory() {
  const classes = useStyles();
  let [catgOpts, setCatgOpts] = useState([]);
  const [open, setOpen] = useState(false);
  let [requestData, setRequestData] = useState({});

  const { data = { fetchSupplyOrders: [] }, refetch: refetchVales } = useQuery(
    SupplyOrderQueries.fetchVales
  );

  const { data: vale, refetch: refetchVale } = useQuery(
    SupplyOrderQueries.getVale
  );

  if (data?.fetchSupplyOrders?.items) {
    catgOpts = processData(data);
  }

  if (vale) {
    const response = vale.getSupplyOrder;
    requestData = {
      supplyLevel: response.nivelSuministro,
      supplyGroup: response.grupoSuministro,
      supplyAttention: response.nivelAtencion,
      reqTypeVoucher: response.type,
      folio: response.folio,
      delegacion: "24 QROO",
      unidadMedica: "HGOP#07",
      serviceUnit: response.idService,
      createdAt: response.requestedAt,
      status: response.status,
      items: [],
    };
  }

  function findRequestByKey(key) {
    refetchVale({ id: parseInt(key) });
  }

  const Content = (
    <NewRequestPreview
      attributes={{
        title: `Vale - ${requestData?.reqTypeVoucher}`.toUpperCase(),
        subtitle: requestData?.status,
      }}
      dataset={{
        dataBody: requestData,
        items: getSupplyRows(requestData?.items),
      }}
    />
  );

  const handleClickOpen = (e) => {
    e && e.preventDefault();

    const key = e.target.parentNode.id;
    // Validar que exista al menos una fila en la tabla
    if (key) {
      findRequestByKey(key);
      // setRequestData(request);
      setOpen(true);
    }
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
            {catgOpts?.map((item, index) => {
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
                      // eslint-disable-next-line react/display-name
                      view_request_button: () => (
                        <Button
                          id={item.id}
                          className={classes.viewButton}
                          color="primary"
                          onClick={handleClickOpen}
                        >
                          <VisibilityIcon /> Ver
                        </Button>
                      ),
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
