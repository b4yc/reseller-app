import React, { useState } from "react";
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
  IonItemDivider,
  IonApp,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "./authenticate.css";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="authenticate">
          <form>
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
            <IonButton type="submit">Register</IonButton>
          </form>
          <IonItem>Already have an account?</IonItem>
          <IonButton href="/login">Sign In</IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Register;
