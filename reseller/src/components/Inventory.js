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
import InventoryTable from "./InventoryTable";
import "./Inventory.scss";

const Inventory = () => {
  const data = [
    {
      ID: 1,
      Name: "2021 Pokemon TCG Sword & Shield Shining Fates Elite Trainer Box",
      BoughtPrice: 64.99,
      SoldPrice: 102.00,
      Category: "Card",
      Status: "Sold",
    },
    {
      ID: 2,
      Name: "Jordan 1 Retro High Patina",
      BoughtPrice: 170.00,
      SoldPrice: 0.00,
      Category: "Shoe",
      Status: "Available",
    },
    {
      ID: 3,
      Name:
        "Sony PS5 PlayStation 5 (US Plug) Blu-ray Edition Console 3005718 White",
      BoughtPrice: 499.99,
      SoldPrice: 906.00,
      Category: "Electronic",
      Status: "Shipped",
    },
  ];

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol className="header" size="0.5">ID</IonCol>
          <IonCol className="header" size="4">Name</IonCol>
          <IonCol className="header" size="1.5">Bought Price</IonCol>
          <IonCol className="header" size="1.5">Sold Price</IonCol>
          <IonCol className="header" size="2">Category</IonCol>
          <IonCol className="header" size="2">Status</IonCol>
        </IonRow>
        {data.map((item) => (
          <InventoryTable
            name={item.Name}
            bprice={item.BoughtPrice}
            sprice={item.SoldPrice}
            ID={item.ID}
            category={item.Category}
            status={item.Status}
          />
        ))}
      </IonGrid>
    </IonPage>
  );
};

export default Inventory;
