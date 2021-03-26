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
import { JsonToTable } from "react-json-to-table";
import Item from "./Item";
import "./Inventory.scss";

const Inventory = () => {
  const data = [
    {
      ID: 1,
      Name: "2021 Pokemon TCG Sword & Shield Shining Fates Elite Trainer Box",
      "Bought Price": 64.99,
      "Sold Price": 102.0,
      Category: "Card",
      Status: "Sold",
    },
    {
      ID: 2,
      Name: "Jordan 1 Retro High Patina",
      "Bought Price": 170.0,
      "Sold Price": 0.0,
      Category: "Shoe",
      Status: "Available",
    },
    {
      ID: 3,
      Name:
        "Sony PS5 PlayStation 5 (US Plug) Blu-ray Edition Console 3005718 White",
      "Bought Price": 499.99,
      "Sold Price": 906.0,
      Category: "Electronic",
      Status: "Shipped",
    },
  ];

  return (
    <IonPage>
      <IonGrid>
        <IonRow className="headerCell">
          {/* <IonCol>ID</IonCol>
          <IonCol>Name</IonCol>
          <IonCol>Bought Price</IonCol>
          <IonCol>Sold Price</IonCol>
          <IonCol>Category</IonCol>
          <IonCol>Status</IonCol> */}
        </IonRow>
        {/* <JsonToTable json={data}/> */}
        {data.map((item) => (
          <Item
            name={item.Name}
            price={item["Bought Price"]}
            ID={item.ID}
            status={item.Status}
          />
        ))}
      </IonGrid>
    </IonPage>
  );
};

export default Inventory;
