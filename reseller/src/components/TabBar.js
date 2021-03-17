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

const Settings = () => <IonPage>Settings</IonPage>;

const TabBar = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/:tab(portfolio)" component={Portfolio} exact={true} />
          <Route path="/:tab(account)" component={Account} exact />
          <Route path="/:tab(settings)" component={Settings} exact />
          <Route exact path="/" render={() => <Redirect to="/portfolio" />} />
        </IonRouterOutlet>
        <IonTabBar slot="top">
          <IonTabButton tab="portfolio" href="/portfolio">
            <IonLabel>Portfolio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href="/account">
            <IonLabel>Account</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default TabBar;
