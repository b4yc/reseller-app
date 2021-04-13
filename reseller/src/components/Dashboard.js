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

const Dashboard = () => {
  const url = window.location.href;
  const lastSegment = url.split("/").pop();

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>ReZellers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <TabBar id={lastSegment} />
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Dashboard;
