import {
    IonCol,
    IonRow,
    IonSelectOption,
    IonRouterLink,
    IonSelect,
    IonAlert
  } from "@ionic/react";
  import React, { useState } from "react";
  import "./Table.scss"

const SaleTable = ({ ID, item, buyer }) => {
  const [showBuyerAlert, setShowBuyerAlert] = useState(false);
  
    return (
      <IonRow>
        <IonCol className="col" size="1">{ID}</IonCol>
        <IonCol className="col" size="8">{item}</IonCol>
        <IonCol className="buyerCol" size="3">
            <IonRouterLink onClick={() => setShowBuyerAlert(true)}>
                {buyer}
            </IonRouterLink>
            <IonAlert
              isOpen={showBuyerAlert}
              onDidDismiss={() => setShowBuyerAlert(false)}
              cssClass='my-custom-class'
              header={'Buyer Information'}
              subHeader={'Name: ' + buyer}
              message={'Email: bc@gmail.com ' + ' Address: 123 Sesame Street'}
              buttons={['Close', 'Edit']}
            />
        </IonCol>
      </IonRow>
    );
  };
  
  export default SaleTable;