import { 
  IonGrid, 
  IonPage, 
  IonRow, 
  IonButton, 
  IonCard, 
  IonAlert, 
  IonItem, 
  IonLabel, 
  IonInput 
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import EdiTextArea from 'react-editext'
import {Link} from "react-router-dom";
import "./Account.scss"
import axios from "axios";

const Account = () => {
  // const seller = [
  //   {
  //     ID: 1,
  //     FName: "Thomas",
  //     LName: "Kahessay",
  //     Email: "tko@gmail.com",
  //     Password: "123",
  //     Address: "Under There",
  //   }
  // ];

  const [seller, setSeller] = useState([]);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [oldPass, setOldPass] = useState(false);
  const [newPass1, setNewPass1] = useState(false);
  const [newPass2, setNewPass2] = useState(false);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const url = window.location.href;
  const id = url.split("/").pop();

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      const userData = {
        id: id,
      };

      const api = axios.create({
        baseURL: `http://127.0.0.1:8000/api`,
      });
      api
        .get("/sellers/", { params: userData })
        .then((res) => {
          setSeller(res.data);
          console.log(res.data);
          console.log("seller: ", seller);
        })
        .catch((error) => {
          console.log(error.response);
        });
      return () => {
        ignore = true;
      };
    }
  }, []);

  return (
    <IonPage className="accountPage">
      <IonGrid>
        <IonRow> First Name </IonRow>
        <IonRow>
          <IonCard className="sellerCard">
            {seller.map((s) => (
              <EdiTextArea 
                className="editText"
                value={s.firstName}
            />))}
          </IonCard>
        </IonRow>
        <IonRow> Last Name </IonRow>
        <IonRow>
          <IonCard className="sellerCard">
            {seller.map((s) => (
              <EdiTextArea 
                className="editText"
                value={s.lastName}
            />))}
          </IonCard>
        </IonRow>
        <IonRow> Email </IonRow>
        <IonRow>
          <IonCard className="sellerCard">
            {seller.map((s) => (
              <EdiTextArea 
                className="editText"
                value={s.email}
            />))}
        </IonCard>
        </IonRow>
        <IonRow> Password </IonRow>
        <IonRow>
          <IonButton onClick={() => setShowPasswordAlert(true)}> Change Password</IonButton>
          <IonAlert
          isOpen={showPasswordAlert}
          onDidDismiss={() => setShowPasswordAlert(false)}
          cssClass='my-custom-class'
          header={'Change Password'}
          inputs={[
            {
              name: 'Old Password',
              type: 'text',
              placeholder: 'Old Password'
            },
            {
              name: 'New Password',
              type: 'text',
              placeholder: 'New Password'
            },
            {
              name: 'Confim New Password',
              typ: 'text',
              placeholder: 'Confirm New Password'
            }
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: 'Save',
              handler: () => {
                console.log('Confirm Save');
              }
            }
          ]}
        />
        </IonRow>
        <IonRow size="2"></IonRow>
        
        {/** only works after page refresh */}
      </IonGrid>
      <IonButton href="/">
        Log Out
      </IonButton>
    </IonPage>
  );
};

export default Account;
