import {
  IonCol,
  IonRow,
  IonSelectOption,
  IonRouterLink,
  IonSelect,
  IonAlert,
  IonModal,
} from "@ionic/react";
import React, { useState } from "react";
import { EditText } from "react-edit-text";
import "./Table.scss";
import axios from "axios";

const InventoryTable = ({
  ID,
  name,
  model,
  brand,
  bprice,
  sprice,
  category,
  status,
}) => {
  const [showShoe, setShowShoe] = useState(false);
  const [showElectronics, setShowElectronics] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [status1, setStatus] = useState(status);
  const [category1, setCategory] = useState(category);
  const [bprice1, setBPrice] = useState(bprice);
  const [sprice1, setSPrice] = useState(sprice);
  const [showBuyer, setShowBuyer] = useState(false);
  const [size, setSize] = useState();
  const [year, setYear] = useState();

  const url = window.location.href;
  const sellerID = url.split("/").pop();

  const handleChangeB = (val) => {
    setBPrice(val);
  };

  const handleChangeS = (val) => {
    setSPrice(val);
  };

  const handleSaveB = (val) => {
    /** POST changes to db */
    setBPrice(parseFloat(bprice1).toFixed(2));
  };

  const handleSaveS = () => {
    /** POST changes to db */
    setSPrice(parseFloat(sprice1).toFixed(2));
  };

  const options = {
    cssClass: "dropdown-interface",
  };

  function getShoeSize(itemID) {
    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api
      .get(`/shoes/${itemID}`)
      .then((response) => {
        setSize(response.data.size);
        setShowShoe(true);
      })
      .catch((e) => console.log(e));
  }

  function getCardYear(itemID) {
    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api
      .get(`/cards/${itemID}`)
      .then((response) => {
        setYear(response.data.year);
        setShowCard(true);
      })
      .catch((e) => console.log(e));
  }

  function changeStatus(itemID, itemStatus) {
    const statusData = {
      status: itemStatus,
    };
    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api
      .patch(`/items/${itemID}/`, statusData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  function changeAskingPrice(itemID, newPrice) {
    newPrice = parseFloat(newPrice).toFixed(2);
    const priceData = {
      askingPrice: newPrice,
    };
    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api
      .patch(`/items/${itemID}/`, priceData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  function addBuyer(buyer, itemID) {
    const buyerData = {
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      email: buyer.email,
      address: buyer.address,
      seller: sellerID,
    };
    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });
    api
      .post(`/buyers/`, buyerData)
      .then((response) => {
        console.log(response);
        let buyerID = response.data.id;
        addSale(buyerID, itemID);
      })
      .catch((e) => console.log(e));
  }

  function addSale(buyerID, itemID) {
    const saleData = {
      date: new Date().toISOString().slice(0, 10),
      seller: sellerID,
      buyer: buyerID,
      item: itemID,
    };
    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });
    api
      .post(`/sales/`, saleData)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  }

  return (
    <IonRow>
      <IonCol className='col' size='0.5'>
        {ID}
      </IonCol>
      <IonCol className='nameCol' size='4'>
        <IonRouterLink
          data-toggle='modal'
          data-target='#myModal'
          onClick={() => {
            if (category === "ELECTRONICS") {
              setShowElectronics(true);
            }
            if (category === "SHOE") {
              getShoeSize(ID);
            }
            if (category === "CARD") {
              getCardYear(ID);
            }
          }}
        >
          {name}
        </IonRouterLink>
        <IonModal
          isOpen={showShoe || showElectronics || showCard}
          className='itemModal'
          onDidDismiss={() => {
            setShowShoe(false);
            setShowElectronics(false);
            setShowCard(false);
          }}
        >
          <h1>{name}</h1>
          <h2>Brand: {brand}</h2>
          <p>
            Model: {model}
            <p hidden={category !== "SHOE"}>Size: {size}</p>
            <p hidden={category !== "CARD"}>Year: {year}</p>
          </p>
        </IonModal>
      </IonCol>
      <IonCol className='col' size='1.5'>
        <EditText
          className='textBox'
          value={bprice1.toString()}
          onChange={handleChangeB}
          onSave={handleSaveB}
        />
      </IonCol>
      <IonCol className='col' size='1.5'>
        <EditText
          className='textBox'
          value={sprice1.toString()}
          onChange={handleChangeS}
          onSave={() => {
            handleSaveS();
            changeAskingPrice(ID, sprice1);
          }}
        />
      </IonCol>
      <IonCol size='2'>
        <IonSelect
          interface='popover'
          interfaceOptions={options}
          value={category1}
          onIonChange={(e) => setCategory(e.detail.value)}
        >
          <IonSelectOption value='CARD'>Card</IonSelectOption>
          <IonSelectOption value='ELECTRONICS'>Electronic</IonSelectOption>
          <IonSelectOption value='SHOE'>Shoe</IonSelectOption>
        </IonSelect>
      </IonCol>
      <IonCol size='2'>
        <IonSelect
          value={status1}
          onIonChange={(e) => {
            setStatus(e.detail.value);
            if (e.detail.value === "SOLD") {
              setShowBuyer(true);
            }
            changeStatus(ID, e.detail.value);
          }}
        >
          <IonAlert
            isOpen={showBuyer}
            onDidDismiss={() => setShowBuyer(false)}
            cssClass='my-custom-class'
            header={"Buyer Information"}
            inputs={[
              {
                name: "firstName",
                type: "text",
                placeholder: "First Name",
              },
              {
                name: "lastName",
                type: "text",
                placeholder: "Last Name",
              },
              {
                name: "email",
                typ: "text",
                placeholder: "Email",
              },
              {
                name: "address",
                typ: "text",
                placeholder: "Address",
              },
            ]}
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                cssClass: "secondary",
                handler: () => {
                  changeStatus(ID, "AVAILABLE");
                  setStatus("AVAILABLE");
                },
              },
              {
                text: "Save",
                handler: (buyerData) => {
                  console.log("Confirm Save");
                  addBuyer(buyerData, ID);
                },
              },
            ]}
          />
          <IonSelectOption value='AVAILABLE' disabled={status1 !== "AVAILABLE"}>
            Available
          </IonSelectOption>
          <IonSelectOption value='SOLD'>Sold</IonSelectOption>
          <IonSelectOption value='SHIPPED' disabled={status1 === "AVAILABLE"}>
            Shipped
          </IonSelectOption>
          <IonSelectOption value='DELIVERED' disabled={status1 === "AVAILABLE"}>
            Delivered
          </IonSelectOption>
        </IonSelect>
      </IonCol>
    </IonRow>
  );
};

export default InventoryTable;
