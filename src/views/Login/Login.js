import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "components/Copyright/Copyright";
import Logo from "components/Logo/Logo";
import Title from "components/Title/Title";
import Input from "components/CustomInput/Input.js";
import { AccountCircle, Lock } from "@material-ui/icons";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import Alert from "@material-ui/lab/Alert";
import AccountQueries from "queries/Account.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ setToken }) {
  const classes = useStyles();
  // const [logUser, { loading, error, data }] = useQuery(
  //   AccountQueries.loginAccount
  // );

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [tryLog, setTryLog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMsg, setAlertMsg] = useState();

  function LoginUser({ card, password }) {
    const { loading, error, data } = useQuery(AccountQueries.loginAccount, {
      // variables: { card: "123456789", password: "123456", address: "imss.gob7" },
      variables: { card: card, password: password },
    });

    // agregar loader
    if (loading) {
      setAlertType("info");
      setAlertMsg("Cargando...");
      setShowAlert(true);
      return <p></p>;
    }

    // Mostrar mensaje de error, disparar un flag que lo muestre
    if (error) {
      setAlertType("error");
      setAlertMsg("Error: El usuario o contraseña ingresados son incorrectos.");
      setShowAlert(true);
      setTryLog(false);
      // Primero mostrar flag
      return <p></p>;
    }

    const { loginAccount } = data;
    // Tal vez sin return y que muestre un mensaje antes de setear el token
    setToken(loginAccount.uuid);
    setAlertType("success");
    setAlertMsg(`¡Bienvenido ${loginAccount.name}!`);
    setShowAlert(true);
    setTryLog(false);
    window.location.reload();
    return <p>Bienvenido!</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // <LoginUser credentials={} />
    // const token = await loginUser({
    //   username,
    //   password,
    // });
    // setToken(token);
    setShowAlert(false);
    setTryLog(true);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error : {error}</p>;
    // // console.log(token);
    // setToken(data?.loginAccount?.uuid);
  };

  const LockIcon = <Lock />;
  const UserIcon = <AccountCircle />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {tryLog && <LoginUser card={username} password={password} />}
      <div className={classes.paper}>
        <Logo />
        <Title text="Ingresa al Sistema de Abasto" />
        {showAlert && <Alert severity={alertType}>{alertMsg}</Alert>}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Input
            attribute={{
              id: "user",
              name: "user",
              label: "Usuario",
              type: "text",
              placeholder: "Ingrese su usuario",
              variant: "outlined",
              margin: "normal",
              required: true,
              fullWidth: true,
              autoComplete: "email",
              autoFocus: true,
            }}
            // Modificar a funcion que valide los parametros
            handleChange={(name, value) => {
              setUserName(value);
            }}
            param={{
              icon: () => UserIcon,
            }}
          />
          <Input
            attribute={{
              id: "password",
              name: "password",
              label: "Contraseña",
              type: "password",
              placeholder: "Ingrese su contraseña",
              variant: "outlined",
              margin: "normal",
              required: true,
              fullWidth: true,
              autoComplete: "current-password",
            }}
            // Modificar a funcion que valide los parametros
            handleChange={(name, value) => {
              setPassword(value);
            }}
            param={{
              icon: () => LockIcon,
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordarme"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            iniciar sesión
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
