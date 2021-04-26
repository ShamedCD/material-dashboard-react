import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import newRequestIcon from "../../assets/img/domain/supply/new-item-icon.png";
import oldRequestIcon from "../../assets/img/domain/supply/old-item-icon.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  greenCard: {
    color: "green",
    border: "solid",
    borderColor: "green",
    maxWidth: 345,
  },
  yellowCard: {
    color: "gray",
    border: "solid",
    borderColor: "gray",
    maxWidth: 345,
  },
});

export default function InfirmaryRequestCard(props) {
  const classes = useStyles();

  const { attribute, param } = props;
  const {
    title,
    body_type,
    body_area,
    body_usr_role,
    body_usr_name,
    is_new,
  } = attribute;

  const ViewRequestButton = param?.view_request_button;

  return (
    <Card className={is_new ? classes.greenCard : classes.yellowCard}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          alt={title}
          className={classes.media}
          image={is_new ? newRequestIcon : oldRequestIcon}
          title={title}
        /> */}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Tipo de solicitud: {body_type}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Área/Departamento: {body_area}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Solicitante: {body_usr_role} {body_usr_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>{ViewRequestButton && <ViewRequestButton />}</CardActions>
    </Card>
  );
}
