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

const TabBar = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/:tab(portfolio)" component={Portfolio} exact={true} />
          <Route path="/:tab(account)" component={Account} exact />
          <Route path="/:tab(inventory)" component={Inventory} exact />
          <Route exact path="/" render={() => <Redirect to="/account" />} />
        </IonRouterOutlet>
        <IonTabBar slot="top">
          <IonTabButton tab="account" href="/account">
            <IonLabel>Account</IonLabel>
          </IonTabButton>
          <IonTabButton tab="portfolio" href="/portfolio">
            <IonLabel>Portfolio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="inventory" href="/inventory">
            <IonLabel>Inventory</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default TabBar;
