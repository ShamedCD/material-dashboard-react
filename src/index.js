/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react";

// core components
import Inventory from "layouts/Inventory.js";
import Infirmary from "layouts/Infirmary.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import Login from "views/Login/Login";
import useToken from "./components/App/useToken";

const hist = createBrowserHistory();
const client = new ApolloClient({
  uri: "http://18.220.254.104:8050/",
  // uri: process.env.API_GATEWAY_URL,
  cache: new InMemoryCache(),
});

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <ApolloProvider client={client}>
        <Login setToken={setToken} />
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Router history={hist}>
        <Switch>
          <Route path="/admin" component={Inventory} />
          <Route path="/infirmary" component={Infirmary} />
          <Route path="/rtl" component={RTL} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
