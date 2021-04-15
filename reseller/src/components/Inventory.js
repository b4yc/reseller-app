import {
  IonCol,
  IonRow,
  IonGrid,
  IonPage,
  IonButton,
  IonList,
  IonModal,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState, useEffect } from "react";

import InventoryTable from "./InventoryTable";
import "./Inventory.scss";
import axios from "axios";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [category, setCategory] = useState();
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [year, setYear] = useState();
  const [boughtPrice, setBoughtPrice] = useState();
  const [askingPrice, setAskingPrice] = useState();

  const url = window.location.href;
  const id = url.split("/").pop();

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
            Asking/ Sold Price
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
            model={item.model}
            brand={item.brand}
            bprice={item.boughtPrice}
            sprice={item.askingPrice}
            ID={item.id}
            category={item.category}
            status={item.status.toString()}
          />
        ))}
      </IonGrid>
      <IonButton
        onClick={() => {
          setShowAddItem(true);
        }}
        className='addBtn'
      >
        Add Item
      </IonButton>
      <IonContent>
        <IonModal
          isOpen={showAddItem}
          cssClass='my-custom-class'
          onDidDismiss={() => setShowAddItem(false)}
        >
          <h1>Add Item</h1>
          <IonList>
            <IonItem>
              <IonLabel>Category</IonLabel>
              <IonSelect
                type='text'
                value={category}
                placeholder='Select One'
                onIonChange={(e) => setCategory(e.detail.value)}
              >
                <IonSelectOption value='ELECTRONICS'>
                  Electronic
                </IonSelectOption>
                <IonSelectOption value='SHOE'>Shoe</IonSelectOption>
                <IonSelectOption value='CARD'>Card</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonInput
                type='text'
                value={name}
                placeholder='Name'
                maxlength='255'
                onIonChange={(e) => setName(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                type='text'
                value={model}
                placeholder='Model'
                maxlength='255'
                onIonChange={(e) => setModel(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                type='text'
                value={brand}
                placeholder='Brand'
                maxlength='255'
                onIonChange={(e) => setBrand(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem hidden={category !== "CARD"}>
              <IonInput
                type='number'
                value={year}
                placeholder='Year'
                onIonChange={(e) => setYear(parseInt(e.detail.value))}
              ></IonInput>
            </IonItem>
            <IonItem hidden={category !== "SHOE"}>
              <IonLabel>Size</IonLabel>
              <IonSelect
                type='text'
                value={size}
                placeholder='Select a Size'
                onIonChange={(e) => setSize(e.detail.value)}
              >
                <IonSelectOption value='4'>4</IonSelectOption>
                <IonSelectOption value='4.5'>4.5</IonSelectOption>
                <IonSelectOption value='5'>5</IonSelectOption>
                <IonSelectOption value='6'>6</IonSelectOption>
                <IonSelectOption value='6.5'>6.5</IonSelectOption>
                <IonSelectOption value='7'>7</IonSelectOption>
                <IonSelectOption value='7.5'>7.5</IonSelectOption>
                <IonSelectOption value='8'>8</IonSelectOption>
                <IonSelectOption value='8.5'>8.5</IonSelectOption>
                <IonSelectOption value='9'>9</IonSelectOption>
                <IonSelectOption value='9.5'>9.5</IonSelectOption>
                <IonSelectOption value='10'>10</IonSelectOption>
                <IonSelectOption value='10.5'>10.5</IonSelectOption>
                <IonSelectOption value='11'>11</IonSelectOption>
                <IonSelectOption value='11.5'>11.5</IonSelectOption>
                <IonSelectOption value='12'>12</IonSelectOption>
                <IonSelectOption value='12.5'>12.5</IonSelectOption>
                <IonSelectOption value='13'>13</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonInput
                type='number'
                value={boughtPrice}
                placeholder='Bought Price'
                onIonChange={(e) => setBoughtPrice(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                type='number'
                value={askingPrice}
                placeholder='Asking Price'
                onIonChange={(e) => setAskingPrice(parseFloat(e.detail.value))}
              ></IonInput>
            </IonItem>
          </IonList>
          <IonGrid>
            <IonRow>
              <IonCol size='6'>
                <IonButton
                  expand='full'
                  onClick={() => setShowAddItem(false)}
                  className='closeBtn'
                >
                  Close
                </IonButton>
              </IonCol>
              <IonCol size='6'>
                <IonButton
                  expand='full'
                  onClick={() => setShowAddItem(false)}
                  className='saveBtn'
                >
                  Save
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Inventory;
