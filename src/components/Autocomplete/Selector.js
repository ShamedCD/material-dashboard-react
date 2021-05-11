/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { FormControl, InputLabel, makeStyles, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 220,
    width: "100%",
    marginTop: "10px",
    alignContent: "center",
  },
}));

export default function Selector({ attributes, behaviour, callback }) {
  const classes = useStyles();
  const { id, label } = attributes;
  const { key, defaultValue, options, props } = behaviour;
  const [state, setState] = useState(defaultValue);

  const handleChange = (event, child) => {
    const name = event.target.name;
    setState({
      id: id,
      [name]: event.target.value,
    });

    callback && callback(event.target, child);
  };

  return (
    <FormControl id={id} variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor={"selector-" + id}>{label}</InputLabel>
      <Select
        native
        {...props}
        value={state[key]}
        onChange={handleChange}
        label={label}
        inputProps={{
          name: key,
          id: "selector-" + id,
        }}
      >
        {options}
      </Select>
    </FormControl>
  );
}
