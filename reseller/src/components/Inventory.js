import { IonCol, IonRow, IonGrid, IonPage } from "@ionic/react";
import React, { useState, useEffect } from "react";

import { JsonToTable } from "react-json-to-table";
import InventoryTable from "./InventoryTable";
import "./Inventory.scss";
import axios from "axios";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const data = [
    {
      ID: 1,
      Name: "2021 Pokemon TCG Sword & Shield Shining Fates Elite Trainer Box",
      BoughtPrice: 64.99,
      SoldPrice: 102.0,
      Category: "Card",
      Status: "Sold",
    },
    {
      ID: 2,
      Name: "Jordan 1 Retro High Patina",
      BoughtPrice: 170.0,
      SoldPrice: 0.0,
      Category: "Shoe",
      Status: "Available",
    },
    {
      ID: 3,
      Name:
        "Sony PS5 PlayStation 5 (US Plug) Blu-ray Edition Console 3005718 White",
      BoughtPrice: 499.99,
      SoldPrice: 906.0,
      Category: "Electronic",
      Status: "Shipped",
    },
  ];

  const url = window.location.href;
  const id = url.split("/").pop();

  // useEffect(() => {
  //   let ignore = false;

  //   if (!ignore) {
  //     const sellerData = {
  //       id: id,
  //     };

  //     const api = axios.create({
  //       baseURL: `http://127.0.0.1:8000/api`,
  //     });
  //     console.log("hi");

  //     api
  //       .get("/items/", { params: sellerData })
  //       .then((res) => {
  //         setItems(res.data);
  //         console.log(res.data);
  //         console.log(items);
  //       })
  //       .catch((error) => {
  //         console.log(error.response);
  //       });
  //   }
  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

  useEffect(() => {
    retrieveItems();
  }, []);

  const retrieveItems = () => {
    const sellerData = {
      id: id,
    };

    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api
      .get(`/items/`, { params: sellerData })
      .then((response) => {
        setItems(response.data);
        console.log(items);
        console.log(response.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol className='header' size='0.5'>
            ID
          </IonCol>
          <IonCol className='header' size='4'>
            Name
          </IonCol>
          <IonCol className='header' size='1.5'>
            Bought Price
          </IonCol>
          <IonCol className='header' size='1.5'>
            Sold Price
          </IonCol>
          <IonCol className='header' size='2'>
            Category
          </IonCol>
          <IonCol className='header' size='2'>
            Status
          </IonCol>
        </IonRow>
        {items.map((item) => (
          <InventoryTable
            name={item.name}
            bprice={item.boughtPrice}
            sprice={item.askingPrice}
            ID={item.id}
            category={item.category}
            status={item.status.toString()}
          />
        ))}
      </IonGrid>
    </IonPage>
  );
};

export default Inventory;
