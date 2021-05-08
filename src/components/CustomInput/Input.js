import { Grid, InputAdornment, makeStyles, TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  margin: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const Input = ({ attribute, handleChange, param }) => {
  const classes = useStyles();
  const {
    id,
    name,
    placeholder,
    type,
    label,
    variant,
    margin,
    required,
    autocomplete,
    autoFocus,
    fullWidth,
  } = attribute;

  const Icon = param?.icon;

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={12}>
          <TextField
            id={id}
            name={name}
            placeholder={placeholder}
            type={type}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            label={label}
            variant={variant}
            margin={margin}
            required={required}
            autoComplete={autocomplete}
            autoFocus={autoFocus}
            fullWidth={fullWidth}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {Icon && <Icon />}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Input;
