import { React, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonText } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Inventory from "./components/Inventory";
import Account from "./components/Account";
import Portfolio from "./components/Portfolio";
import "./App.css";

const App = () => {
  const [token, setToken] = useState();
  // set to API return call for login
  {
    /*if (!token) {
    return <Login setToken={setToken} />;
  }
*/
  }
  return (
    <IonApp className="App">
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/portfolio" component={Dashboard} />
            <Route path="/account" component={Dashboard} />
            <Route path="/inventory" component={Dashboard} />
            <Redirect exact from="/" to="/login" />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </IonApp>
  );
};

export default App;
