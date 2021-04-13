import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
  IonTextarea,
  IonRouterOutlet,
  IonImg,
  IonInput,
  IonItem,
  IonText,
  IonAlert,
} from "@ionic/react";
import { React, Route, Redirect, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import PropTypes from "prop-types";
import Dashboard from "./Dashboard";
import axios from "axios";

import "./authenticate.css";

function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const Login = ({ setToken }) => {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (!email) {
      setMessage("Please enter a valid email");
      setError(true);
      return;
    }
    if (validateEmail(email) === false) {
      setMessage("Your email is invalid");
      setError(true);
      return;
    }

    if (!password) {
      setMessage("Please enter your password");
      setError(true);
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    const api = axios.create({
      baseURL: `http://127.0.0.1:8000/api`,
    });
    api
      .get("/sellers/", { params: loginData })
      .then((res) => {
        history.push("/dashboard/" + res.data[0]["id"]);
        console.log(res.data[0]["id"]);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage("Incorrect email or password. Have you made an account?");
        setError(true);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="authenticate">
        <IonAlert
          isOpen={error}
          onDidDismiss={() => setError(false)}
          cssClass="my-custom-class"
          header={"Error!"}
          message={message}
          buttons={["Dismiss"]}
        />
        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            placeholder="email"
            onIonChange={(e) => setEmail(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            placeholder="password"
            onIonChange={(e) => setPassword(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonButton onClick={handleLogin}>Login </IonButton>
        <IonItem>Don't have an account?</IonItem>
        <IonButton href="/register">Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
