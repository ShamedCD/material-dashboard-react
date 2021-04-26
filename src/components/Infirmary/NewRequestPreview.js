import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Logo from "components/Logo/Logo";
import Table from "components/Table/Table.js";
import Title from "components/Title/Title";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    // verticalAlign: "middle",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  leyend: {
    background: "#D3D3D3",
    textAlign: "center",
    padding: "10px 40px 10px 40px",
    border: "solid",
    borderWidth: "thin",
    "& h3,& h4": {
      margin: "0 !important",
    },
  },
  body: {
    margin: "15px",
  },
  signatureContent: {
    border: "solid",
    margin: "40px",
    textAlign: "center",
  },
  signatureItem: {
    paddingTop: "80px",
  },
  subtitle: {
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
}));

export default function NewRequestPreview({ attributes, dataset }) {
  const classes = useStyles();

  const { title, subtitle, footer: Footer } = attributes;
  const { reqType, reqTypeVoucher, items } = dataset;
  return (
    <section>
      <div id="req-preview-header" className={classes.header}>
        <div style={{ width: "15%" }}>
          <Logo />
        </div>
      </div>
      <Title className={classes.title} text={title}></Title>
      {subtitle && <h6 className={classes.subtitle}>{subtitle}</h6>}
      <div id="req-preview-leyend" className={classes.leyend}>
        <h3>
          <b>INSTITUTO MEXICANO DEL SEGURO SOCIAL</b>
        </h3>
        <h3>SEGURIDAD Y SOLIDARIDAD SOCIAL</h3>
        <h4>
          Reaprovisionamiento y control de material a servicios en unidades de
          atención médica F/RS/1/94
        </h4>
      </div>
      <div id="req-preview-body" className={classes.body}>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <p>Nivel de suministro: </p>
            <p>Grupo de suministro: </p>
            <p>Nivel de atención: </p>
            <p>
              Tipo de solicitud: {reqType && reqType.toUpperCase()}{" "}
              {reqTypeVoucher && " - " + reqTypeVoucher}
            </p>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <p>Folio: </p>
            <p>Delegacion: </p>
            <p>Unidad Medica: </p>
            <p>Sercicio: </p>
            <p>Fecha de suministro: </p>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Table
              tableHeaderColor="initial"
              // tableHead={columns}
              // tableData={rows}
              tableHead={[
                "Clave",
                "Nombre",
                "CPM",
                "PRES",
                "DOT",
                "GRANEL",
                "UNIDAD",
                "PRECIO",
                "IMPORTE",
              ]}
              tableData={items}
            />
          </GridItem>
        </GridContainer>
      </div>
      <div id="req-preview-signature" className={classes.signatureContent}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <p className={classes.signatureItem}>
              Autorización<br></br> Jefa de Enfermería
            </p>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <p className={classes.signatureItem}>Jefe de abastos</p>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <p className={classes.signatureItem}>Surte el pedido almacenista</p>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <p className={classes.signatureItem}>Recibe el pedido</p>
          </GridItem>
        </GridContainer>
      </div>
      <div id="req-preview-buttons">{Footer && <Footer />}</div>
    </section>
  );
}
