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
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
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
              <IonLabel>First Name</IonLabel>
              <IonInput
                value={fname}
                placeholder="first name"
                onIonChange={(e) => setFname(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Last Name</IonLabel>
              <IonInput
                value={lname}
                placeholder="last name"
                onIonChange={(e) => setLname(e.detail.value)}
              ></IonInput>
            </IonItem>
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
