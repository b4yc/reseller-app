import {
  IonCol,
  IonRow,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonLabel,
  IonTabButton,
  IonApp,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Inventory from "./Inventory";
import Account from "./Account";
import Portfolio from "./Portfolio";
import TabBar from "./TabBar";

const Dashboard1 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <TabBar />
    </IonPage>
  );
};

const Dashboard = () => {
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TabBar />
      </IonContent>
    </IonApp>
  );
};

export default Dashboard;
