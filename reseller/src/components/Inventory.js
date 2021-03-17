import {
  IonCol,
  IonRow,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import Item from "./Item";

const Inventory = () => {
  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol>ID</IonCol>
          <IonCol>Name</IonCol>
          <IonCol>Price</IonCol>
        </IonRow>
        <Item name="name test" price="100" ID="200" />
      </IonGrid>
    </IonPage>
  );
};

export default Inventory;
