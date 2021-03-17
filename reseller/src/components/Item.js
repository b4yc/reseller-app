import { IonCol, IonRow, IonGrid } from "@ionic/react";
import React from "react";

const Item = ({ ID, name, price }) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>{ID}</IonCol>
        <IonCol>{name}</IonCol>
        <IonCol>{price}</IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Item;
