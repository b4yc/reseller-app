import {
  IonCol,
  IonRow,
  IonSelectOption,
  IonRouterLink,
  IonSelect,
  IonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import "./Table.scss";

const SaleTable = ({
  ID,
  item,
  buyerFName,
  buyerLName,
  buyerEmail,
  buyerAddress,
}) => {
  const [showBuyerAlert, setShowBuyerAlert] = useState(false);

  if (ID) {
    return (
      <IonRow>
        <IonCol className="col" size="1">
          {ID}
        </IonCol>
        <IonCol className="col" size="8">
          {item}
        </IonCol>
        <IonCol className="buyerCol" size="3">
          <IonRouterLink onClick={() => setShowBuyerAlert(true)}>
            {buyerFName + " " + buyerLName}
          </IonRouterLink>
          <IonAlert
            isOpen={showBuyerAlert}
            onDidDismiss={() => setShowBuyerAlert(false)}
            cssClass="my-custom-class"
            header={"Buyer Information"}
            subHeader={"Name: " + buyerFName + " " + buyerLName}
            message={`Email: ${buyerEmail}` + ` Address: ${buyerAddress}`}
            buttons={["Close"]}
          />
        </IonCol>
      </IonRow>
    );
  } else {
    return null;
  }
};

export default SaleTable;
