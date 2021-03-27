import {
    IonCol,
    IonRow,
    IonSelectOption,
    IonRouterLink,
    IonSelect,
  } from "@ionic/react";
  import React, { useState } from "react";
  import "./Table.scss"

const SaleTable = ({ ID, item, buyer }) => {
    return (
      <IonRow>
        <IonCol className="col" size="1">{ID}</IonCol>
        <IonCol className="col" size="8">{item}</IonCol>
        <IonCol className="buyerCol" size="3">
            <IonRouterLink href={'/portfolio'}>
                {buyer}
            </IonRouterLink>
        </IonCol>
      </IonRow>
    );
  };
  
  export default SaleTable;