import { IonGrid, IonPage, IonRow, IonButton, IonCard } from "@ionic/react";
import React from "react";
import EdiTextArea from 'react-editext'
import {Link} from "react-router-dom";
import "./Account.scss"

const Account = () => {
  const seller = [
    {
      ID: 1,
      FName: "Thomas",
      LName: "Kahessay",
      Email: "tko@gmail.com",
      Password: "123",
      Address: "Under There",
    }
  ];

  // const handleSave = val => {
  //   setBPrice(val)
  // }

  return (
    <IonPage className="accountPage">
      <IonGrid>
        <IonRow> First Name </IonRow>
        <IonRow>
          <IonCard className="sellerCard">
            {seller.map((s) => (
              <EdiTextArea 
                className="editText"
                value={s.FName}
            />))}
          </IonCard>
        </IonRow>
        <IonRow> Last Name </IonRow>
        <IonRow>
          <IonCard className="sellerCard">
            {seller.map((s) => (
              <EdiTextArea 
                className="editText"
                value={s.LName}
            />))}
          </IonCard>
        </IonRow>
        <IonRow> Email </IonRow>
        <IonRow>
          <IonCard className="sellerCard">
            {seller.map((s) => (
              <EdiTextArea 
                className="editText"
                value={s.Email}
            />))}
        </IonCard>
        </IonRow>
        <IonRow> Address </IonRow>
        <IonRow>
          <IonCard className="sellerCard">
            {seller.map((s) => (
              <EdiTextArea 
                className="editText"
                value={s.Address}
            />))}
        </IonCard>
        </IonRow>
        <IonRow> Password </IonRow>
        <IonRow>
          <IonButton>Change Password</IonButton>
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
