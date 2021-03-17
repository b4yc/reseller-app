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
} from "@ionic/react";
import { React, Route, Redirect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import PropTypes from "prop-types";
import Dashboard from "./Dashboard";

import "./authenticate.css";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="authenticate">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonInput
              value={email}
              placeholder="email"
              onIonChange={(e) => setEmail(e.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Password</IonLabel>
            <IonInput
              value={password}
              placeholder="password"
              onIonChange={(e) => setPassword(e.detail.value)}
            ></IonInput>
          </IonItem>
          <IonButton href="/dashboard">Login </IonButton>
        </form>
        <IonItem>Don't have an account?</IonItem>
        <IonButton href="/register">Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
