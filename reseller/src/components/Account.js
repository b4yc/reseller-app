import { IonGrid, IonPage, IonRow, IonButton, IonCard, IonAlert, IonItem, IonLabel, IonInput } from "@ionic/react";
import React, { useState } from "react";
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

  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [oldPass, setOldPass] = useState(false);
  const [newPass1, setNewPass1] = useState(false);
  const [newPass2, setNewPass2] = useState(false);
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
        <IonRow> Password </IonRow>
        <IonRow>
          <IonButton onClick={() => setShowPasswordAlert(true)} >Change Password</IonButton>
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
