import {
  IonCol,
  IonRow,
  IonGrid,
  IonItem,
  IonLabel,
  IonSelectOption,
  IonSelect,
} from "@ionic/react";
import React, { useState } from "react";

const Item = ({ ID, name, price, status }) => {
  const [status1, setStatus] = useState(status);
  return (
    <IonGrid>
      <IonRow>
        <IonCol width="100">{ID}</IonCol>
        <IonCol width="100">{name}</IonCol>
        <IonCol width="100">{price}</IonCol>
        <IonCol width="100">
          <IonItem>
            <IonSelect
              value={status1}
              onIonChange={(e) => setStatus(e.detail.value)}
            >
              <IonSelectOption value="Shipped">Shipped</IonSelectOption>
              <IonSelectOption value="Available">Available</IonSelectOption>
              <IonSelectOption value="Sold">Sold</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Item;
