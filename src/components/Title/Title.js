import { Typography } from "@material-ui/core";
import React from "react";

const Title = ({ text, className }) => {
  return (
    <Typography className={className} component="h1" variant="h5">
      {text}
    </Typography>
  );
};

export default Title;
