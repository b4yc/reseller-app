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
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Account from "./Account";
import Portfolio from "./Portfolio";

const TabBar = (props) => {
  console.log(props.id);
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/:tab(portfolio)" component={Portfolio} />
          <Route path="/:tab(account)" component={Account} />
          <Route path="/:tab(inventory)" component={Inventory} />
          <Route exact path="/" render={() => <Redirect to="/account" />} />
        </IonRouterOutlet>
        <IonTabBar slot="top">
          <IonTabButton tab="account" href={`/account/${props.id}`}>
            <IonLabel>Account</IonLabel>
          </IonTabButton>
          <IonTabButton tab="portfolio" href={`/portfolio/${props.id}`}>
            <IonLabel>Portfolio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="inventory" href={`/inventory/${props.id}`}>
            <IonLabel>Inventory</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default TabBar;
