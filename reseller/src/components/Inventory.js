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
  IonAlert,
} from "@ionic/react";
import React, { useState, useEffect } from "react";

import InventoryTable from "./InventoryTable";
import "./Inventory.scss";
import "../App.css";
import axios from "axios";

const Inventory = () => {
  const [items, setItems] = useState([]); // inventory items
  const [showAddItem, setShowAddItem] = useState(false); // add item modal
  const [category, setCategory] = useState(); // category in add item modal
  const [name, setName] = useState(""); // name in add item modal
  const [model, setModel] = useState(""); // model in add item modal
  const [brand, setBrand] = useState(""); // brand in add item modal
  const [size, setSize] = useState(""); // size in add item modal
  const [year, setYear] = useState(); // year in add item modal
  const [boughtPrice, setBoughtPrice] = useState(); // bought price in add item modal
  const [askingPrice, setAskingPrice] = useState(); // asking price in add item modal
  const [showAlert, setShowAlert] = useState(false); // alert for modal

  const url = window.location.href;
  const id = url.split("/").pop(); // getting the user id from the url

  /**
   * Retrieve items on page load
   */
  useEffect(() => {
    retrieveItems();
  }, []);

  /**
   * Get request for items table for the specific seller
   */
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

  /**
   * Post request for electronics table for the specific seller
   */
  function addElectronic() {
    const itemData = {
      status: "AVAILABLE",
      askingPrice: parseFloat(askingPrice).toFixed(2),
      boughtPrice: parseFloat(boughtPrice).toFixed(2),
      name: name,
      model: model,
      category: "ELECTRONICS",
      brand: brand,
      seller: parseInt(id),
    };

    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api
      .post(`/electronics/`, itemData)
      .then((response) => {
        console.log(response);
        retrieveItems();
      })
      .catch((e) => console.log(e));
  }

  /**
   * Post request for shoe table for the specific seller
   */
  function addShoe() {
    const itemData = {
      status: "AVAILABLE",
      askingPrice: askingPrice,
      boughtPrice: boughtPrice,
      name: name,
      model: model,
      category: "SHOE",
      brand: brand,
      size: size,
      seller: id,
    };

    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api
      .post(`/shoes/`, itemData)
      .then((response) => {
        console.log(response);
        retrieveItems();
      })
      .catch((e) => console.log(e));
  }

  /**
   * Post request for card table
   */
  function addCard() {
    const itemData = {
      status: "AVAILABLE",
      askingPrice: askingPrice,
      boughtPrice: boughtPrice,
      name: name,
      model: model,
      category: "CARD",
      brand: brand,
      year: year,
      seller: id,
    };

    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api
      .post(`/cards/`, itemData)
      .then((response) => {
        console.log(response);
        retrieveItems();
      })
      .catch((e) => console.log(e));
  }

  function updateExpenses(currentExpenses, id) {
    let result = parseFloat(currentExpenses) + parseFloat(boughtPrice);

    const expenseData = {
      moneySpent: result,
    };

    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api
      .patch(`/expenses/${id}/`, expenseData)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  }

  function getExpenses() {
    const sellerData = {
      seller: id,
    };

    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api
      .get(`/expenses/`, { params: sellerData })
      .then((response) => {
        // setExpenses(response.data[0].moneySpent);
        updateExpenses(response.data[0].moneySpent, response.data[0].id);
      })
      .catch((e) => console.log(e));
  }

  /**
   * Format asking price
   */
  function formatAsk() {
    setAskingPrice(parseFloat(askingPrice).toFixed(2));
  }

  /**
   * Format bought price
   */
  function formatBought() {
    setBoughtPrice(parseFloat(boughtPrice).toFixed(2));
  }

  function clearData() {
    setCategory();
    setName("");
    setModel("");
    setBrand("");
    setSize();
    setYear();
    setBoughtPrice();
    setAskingPrice();
  }

  return (
    <IonPage
      style={{
        overflow: "auto",
        overflowY: "scroll",
      }}
    >
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
            Asking Price
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
        <IonButton
          onClick={() => {
            setShowAddItem(true);
          }}
          className='addBtn'
          shape='round'
          size='default'
        >
          Add Item
        </IonButton>
      </IonGrid>
      <IonContent>
        <IonModal
          isOpen={showAddItem}
          cssClass='my-custom-class'
          onDidDismiss={() => {
            setShowAddItem(false);
            clearData();
          }}
          className='addModal'
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
                onIonChange={(e) => {
                  setBoughtPrice(e.detail.value);
                }}
                onPointerLeave={() => {
                  formatBought();
                }}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                type='number'
                value={askingPrice}
                placeholder='Asking Price'
                onIonChange={(e) => setAskingPrice(e.detail.value)}
                onPointerLeave={() => {
                  formatAsk();
                }}
              ></IonInput>
            </IonItem>
          </IonList>
          <IonGrid>
            <IonRow>
              <IonCol size='6'>
                <IonButton
                  expand='full'
                  onClick={() => {
                    setShowAddItem(false);
                    clearData();
                  }}
                  className='cancelBtn'
                  shape='round'
                >
                  Cancel
                </IonButton>
              </IonCol>
              <IonCol size='6'>
                <IonButton
                  expand='full'
                  onClick={() => {
                    if (
                      !category ||
                      !name ||
                      !model ||
                      !brand ||
                      !boughtPrice ||
                      !askingPrice
                    ) {
                      setShowAlert(true);
                      return;
                    }
                    setShowAddItem(false);
                    if (category === "ELECTRONICS") {
                      getExpenses();
                      addElectronic();
                    }
                    if (category === "SHOE") {
                      if (!size) {
                        setShowAlert(true);
                        return;
                      }
                      getExpenses();
                      addShoe();
                    }
                    if (category === "CARD") {
                      if (!year) {
                        setShowAlert(true);
                        return;
                      }
                      getExpenses();
                      addCard();
                    }
                  }}
                  shape='round'
                >
                  Add
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            message='Please Enter All Fields'
            buttons={[
              {
                text: "OK",
                handler: () => {
                  setShowAlert(false);
                },
              },
            ]}
          />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Inventory;
