import {
  IonGrid,
  IonPage,
  IonRow,
  IonButton,
  IonCard,
  IonAlert,
  IonItem,
  IonLabel,
  IonInput,
  IonContent,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import EdiTextArea from "react-editext";
import { Link } from "react-router-dom";
import "./Account.scss";
import "../App.css";
import axios from "axios";

const Account = () => {
  const [seller, setSeller] = useState([]);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const url = window.location.href;
  const id = url.split("/").pop();

  const api = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
  });

  function validateEmail(email) {
    if (!email) {
      setMessage("Nothing was entered");
      setError(true);
      return false;
    }
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    if (!re.test(String(email).toLowerCase())) {
      setMessage("Your email is invalid");
      setError(true);
      return false;
    }
    return true;
  }

  function validateName(name) {
    if (!name) {
      setMessage("Nothing was entered");
      setError(true);
      console.log(seller[0]);
      return false;
    }
    return true;
  }

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      const userData = {
        id: id,
      };

      api
        .get("/sellers/", { params: userData })
        .then((res) => {
          setSeller(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      return () => {
        ignore = true;
      };
    }
  }, []);

  const handlePasswordChange = (passwordData) => {
    if (!passwordData.oldPassword) {
      setMessage("Please enter current password");
      setError(true);
      return;
    }
    if (!passwordData.newPassword1) {
      setMessage("Please enter your new password");
      setError(true);
      return;
    }
    if (!passwordData.newPassword2) {
      setMessage("Please confirm your new password");
      setError(true);
      return;
    }
    if (
      passwordData.newPassword1.localeCompare(passwordData.newPassword2) != 0
    ) {
      setMessage("Passwords do not match");
      setError(true);
      return;
    }
    if (passwordData.oldPassword.localeCompare(seller[0]["password"])) {
      setMessage("Incorrect old password");
      setError(true);
      return;
    }

    seller[0]["password"] = passwordData.newPassword1;

    api
      .patch("/sellers/" + seller[0]["id"] + "/", {
        password: passwordData.newPassword1,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage("Oops! Something went wrong.");
        setError(true);
      });
  };

  const handleFNameChange = (fname) => {
    seller[0]["firstName"] = fname;

    const fnameData = {
      firstName: fname,
    };

    api
      .patch("/sellers/" + seller[0]["id"] + "/", fnameData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage("Oops! Something went wrong.");
        setError(true);
      });
  };

  const handleLNameChange = (lname) => {
    seller[0]["lastName"] = lname;

    const lnameData = {
      lastName: lname,
    };

    api
      .patch("/sellers/" + seller[0]["id"] + "/", lnameData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage("Oops! Something went wrong.");
        setError(true);
      });
  };

  const handleEmailChange = (email) => {
    seller[0]["email"] = email;

    const emailData = {
      email: email,
    };

    api
      .patch("/sellers/" + seller[0]["id"] + "/", emailData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage("Oops! Something went wrong.");
        setError(true);
      });
  };

  return (
    <IonPage
      className="accountPage"
      style={{
        overflow: "auto",
      }}
    >
      <IonGrid>
        <IonRow> First Name </IonRow>
        <IonRow>
          <IonCard className="sellerCard">
            {seller.map((s) => (
              <EdiTextArea
                className="editText"
                value={s.firstName}
                validation={validateName}
                onSave={handleFNameChange}
              />
            ))}
          </IonCard>
        </IonRow>
        <IonRow> Last Name </IonRow>
        <IonRow>
          <IonCard className="sellerCard">
            {seller.map((s) => (
              <EdiTextArea
                className="editText"
                value={s.lastName}
                validation={validateName}
                onSave={handleLNameChange}
              />
            ))}
          </IonCard>
        </IonRow>
        <IonRow> Email </IonRow>
        <IonRow>
          <IonCard className="sellerCard">
            {seller.map((s) => (
              <EdiTextArea
                className="editText"
                value={s.email}
                validation={validateEmail}
                onSave={handleEmailChange}
              />
            ))}
          </IonCard>
        </IonRow>
        <IonRow> Password </IonRow>
        <IonRow>
          <IonButton onClick={() => setShowPasswordAlert(true)}>
            {" "}
            Change Password
          </IonButton>
          <IonAlert
            isOpen={showPasswordAlert}
            onDidDismiss={() => setShowPasswordAlert(false)}
            cssClass="my-custom-class"
            header={"Change Password"}
            inputs={[
              {
                name: "oldPassword",
                type: "password",
                placeholder: "Old Password",
              },
              {
                name: "newPassword1",
                type: "password",
                placeholder: "New Password",
              },
              {
                name: "newPassword2",
                type: "password",
                placeholder: "Confirm New Password",
              },
            ]}
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                cssClass: "secondary",
              },
              {
                text: "Save",
                handler: (passwordData) => {
                  handlePasswordChange(passwordData);
                },
              },
            ]}
          />
          <IonAlert
            isOpen={error}
            onDidDismiss={() => setError(false)}
            cssClass="my-custom-class"
            header={"Error!"}
            message={message}
            buttons={["Dismiss"]}
          />
        </IonRow>
        <IonRow size="2"></IonRow>
      </IonGrid>
      <IonButton href="/">Log Out</IonButton>
    </IonPage>
  );
};

export default Account;
