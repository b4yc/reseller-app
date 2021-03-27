import {
  IonCol,
  IonRow,
  IonGrid,
  IonItem,
  IonLabel,
  IonSelectOption,
  IonRouterLink,
  IonSelect,
  IonContent,
} from "@ionic/react";
import React, { useState } from "react";
import {EditText} from 'react-edit-text';
import "./Table.scss";

const InventoryTable = ({ ID, name, bprice, sprice, category, status }) => {
  const [status1, setStatus] = useState(status);
  const [category1, setCategory] = useState(category);
  const [bprice1, setBPrice] = useState(bprice.toFixed(2));
  const [sprice1, setSPrice] = useState(sprice.toFixed(2));

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
 });

  const handleChangeB = val => {
    setBPrice(val)
  }

  const handleChangeS = val => {
    setSPrice(val)
  }

  const handleSaveB = val => {
    /** POST changes to db */
    setBPrice(parseFloat(bprice1).toFixed(2))
  }

  const handleSaveS = val => {
    /** POST changes to db */
    setSPrice(parseFloat(sprice1).toFixed(2))
  }

  

  return (
    <IonRow>
      <IonCol className="col" size="0.5">{ID}</IonCol>
      <IonCol className="nameCol" size="4">
        <IonRouterLink data-toggle="modal" data-target="#myModal" href={"/inventory/" + ID}>
          {name}
        </IonRouterLink>
      </IonCol>
      <IonCol className="col" size="1.5">
        <EditText
          className="textBox"
          value={bprice1.toString()}
          onChange={handleChangeB}
          onSave={handleSaveB}
        />
      </IonCol>
      <IonCol className="col" size="1.5">
        <EditText
          className="textBox"
          value={sprice1.toString()}
          onChange={handleChangeS}
          onSave={handleSaveS}
        />
      </IonCol>
      <IonCol size="2">
        <IonSelect
          value={category1}
          onIonChange={(e) => setCategory(e.detail.value)}
        >
          <IonSelectOption value="Card">Card</IonSelectOption>
          <IonSelectOption value="Clothing">Clothing</IonSelectOption>
          <IonSelectOption value="Electronic">Electronic</IonSelectOption>
          <IonSelectOption value="Shoe">Shoe</IonSelectOption>
        </IonSelect>
      </IonCol>
      <IonCol size="2">
        <IonSelect
          value={status1}
          onIonChange={(e) => setStatus(e.detail.value)}
        >
          <IonSelectOption value="Available">Available</IonSelectOption>
          <IonSelectOption value="Delivered">Delivered</IonSelectOption>
          <IonSelectOption value="Shipped">Shipped</IonSelectOption>
          <IonSelectOption value="Sold">Sold</IonSelectOption>
        </IonSelect>
      </IonCol>
    </IonRow>
  );
};

export default InventoryTable;