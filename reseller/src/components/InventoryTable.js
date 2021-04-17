import {
  IonCol,
  IonRow,
  IonSelectOption,
  IonRouterLink,
  IonSelect,
  IonAlert,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonButton,
  IonInput,
  IonText,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
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
  const [buyerType, setBuyerType] = useState();
  const [existingBuyers, setExistingBuyers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState();
  const [address, setAddress] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [buyer, setBuyer] = useState();
  const [size, setSize] = useState();
  const [year, setYear] = useState();
  const url = window.location.href;
  const sellerID = url.split("/").pop();

  useEffect(() => {
    getExistingBuyers();
  }, []);

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

  function validateEmail(email) {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    if (!re.test(String(email).toLowerCase())) {
      return false;
    }
    return true;
  }

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

  function getExistingBuyers() {
    const sellerData = {
      id: sellerID,
    };

    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    api.get(`/buyers/`, { params: sellerData }).then((response) => {
      setExistingBuyers(response.data);
      // console.log("should have:", response.data);
      // console.log("has", existingBuyers);
    });
  }

  function addBuyer(itemID) {
    const buyerData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
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
        getExistingBuyers();
        let buyerID = response.data.id;
        addSale(buyerID, itemID);
      })
      .catch((e) => {
        console.log(e);
        changeStatus(ID, "AVAILABLE");
        setStatus("AVAILABLE");
      });
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

  function clearData() {
    setBuyerType();
    setFirstName("");
    setLastName("");
    setEmail();
    setAddress("");
    setBuyer();
  }

  function formatText(category) {
    if (category === "ELECTRONICS") {
      return "Electronics";
    } else if (category === "SHOE") {
      return "Shoe";
    } else if (category === "CARD") {
      return "Card";
    }
  }

  // console.log("I am here: ", existingBuyers);
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
        {bprice1.toString()}
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
      <IonCol size='2' className='col'>
        <IonText>{formatText(category1)}</IonText>
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
          <IonModal isOpen={showBuyer} backdropDismiss={false}>
            <h1>Buyer Details</h1>
            <IonList>
              <IonItem>
                <IonLabel>New or Existing Customer</IonLabel>
                <IonSelect
                  type='text'
                  value={buyerType}
                  placeholder='Select One'
                  onIonChange={(e) => {
                    setBuyerType(e.detail.value);
                  }}
                >
                  <IonSelectOption value='NEW'>New</IonSelectOption>
                  <IonSelectOption value='EXISTING'>Existing</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem hidden={buyerType !== "EXISTING"}>
                <IonLabel>Select Customer</IonLabel>
                <IonSelect
                  type='text'
                  value={buyer}
                  placeholder='Select One'
                  onIonChange={(e) => {
                    setBuyer(e.detail.value);
                  }}
                >
                  {existingBuyers.map((person) => (
                    <IonSelectOption value={person.id}>
                      {person.firstName} {person.lastName}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem hidden={buyerType !== "NEW"}>
                <IonInput
                  type='text'
                  value={firstName}
                  placeholder='First Name'
                  maxlength='255'
                  onIonChange={(e) => setFirstName(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonItem hidden={buyerType !== "NEW"}>
                <IonInput
                  type='text'
                  value={lastName}
                  placeholder='Last Name'
                  maxlength='255'
                  onIonChange={(e) => setLastName(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonItem hidden={buyerType !== "NEW"}>
                <IonInput
                  type='email'
                  value={email}
                  placeholder='Email'
                  maxlength='255'
                  onIonChange={(e) => setEmail(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonItem hidden={buyerType !== "NEW"}>
                <IonInput
                  type='text'
                  value={address}
                  placeholder='Address'
                  maxlength='255'
                  onIonChange={(e) => setAddress(e.detail.value)}
                ></IonInput>
              </IonItem>
            </IonList>
            <IonGrid>
              <IonRow>
                <IonCol size='6'>
                  <IonButton
                    expand='full'
                    onClick={() => {
                      changeStatus(ID, "AVAILABLE");
                      setStatus("AVAILABLE");
                      setShowBuyer(false);
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
                      if (buyerType === "NEW") {
                        if (
                          !firstName ||
                          !lastName ||
                          !email ||
                          !address ||
                          !validateEmail(email)
                        ) {
                          setShowAlert(true);
                          return;
                        }
                        setShowBuyer(false);
                        addBuyer(ID);
                        console.log("in code has: ", existingBuyers);
                      }
                      if (buyerType === "EXISTING") {
                        if (!buyer) {
                          setShowAlert(true);
                          return;
                        }
                        setShowBuyer(false);
                        addSale(buyer, ID);
                      }
                    }}
                    shape='round'
                  >
                    Save
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              message='Please Enter All Fields Correctly'
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
