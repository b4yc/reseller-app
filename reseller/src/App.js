import { React, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonText,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { History } from 'history'
import { useHistory } from 'react-router'

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import Account from "./components/Account";
import Portfolio from "./components/Portfolio";
import "./App.css";

let submitEmail;

const App = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login, setLogin] = useState(true);
  let count = 1;

  return (
    <IonApp className="App">
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard:id" component={Dashboard} />
          <Route path="/portfolio" component={Dashboard} />
          <Route path="/account" component={Dashboard} />
          <Route path="/inventory" component={Dashboard} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
