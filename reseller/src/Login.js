import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import "./login.css";

const Login = () => {
  return (
    <IonPage className="login">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign in</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonTextarea placeholder="username"></IonTextarea>
        <IonTextarea placeholder="password"></IonTextarea>
        <IonButton routerLink="/dashboard">
          <IonLabel>Login</IonLabel>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
