import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import defaultImage from "../../assets/img/domain/supply/default-thumbnail.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function InventoryCard(props) {
  const classes = useStyles();

  const { attribute, param } = props;
  const {
    title,
    body_device,
    body_model,
    body_code,
    remaining_units,
    available_units,
    image,
  } = attribute;

  const RequestButton = param?.request_button;
  const AddButton = param?.add_button;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={image ? image : defaultImage}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Equipo: {body_device}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Modelo: {body_model}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Clave: {body_code}
          </Typography>
          {remaining_units && (
            <Typography variant="body2" color="error" component="p">
              Unidades restantes: {remaining_units}
            </Typography>
          )}
          {available_units && (
            <Typography variant="body2" color="secondary" component="p">
              Unidades disponibles: {available_units}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {RequestButton && <RequestButton />}
        {AddButton && <AddButton />}
      </CardActions>
    </Card>
  );
}
