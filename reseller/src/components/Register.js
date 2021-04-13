import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
  IonTextarea,
  IonRouterOutlet,
  IonImg,
  IonInput,
  IonItem,
  IonText,
  IonItemDivider,
  IonApp,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useHistory } from "react-router-dom";
import "./authenticate.css";
import axios from "axios";

function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const Register = () => {
  const history = useHistory();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleRegister = () => {
    if (!email) {
      setMessage("Please enter a valid email");
      setError(true);
      return;
    }
    if (validateEmail(email) === false) {
      setMessage("Your email is invalid");
      setError(true);
      return;
    }

    if (!password) {
      setMessage("Please enter your password");
      setError(true);
      return;
    }

    if (!fname) {
      setMessage("Please enter your first name");
      setError(true);
      return;
    }

    if (!lname) {
      setMessage("Please enter your last name");
      setError(true);
      return;
    }

    const registerData = {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
    };

    const api = axios.create({
      baseURL: `http://127.0.0.1:8000/api`,
    });
    api
      .post("/sellers/", registerData)
      .then((res) => {
        history.push("/portfolio/" + res.data[0]["id"]);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage("Email already has an account.");
        setError(true);
      });
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="authenticate">
          <form>
            <IonItem>
              <IonLabel>First Name</IonLabel>
              <IonInput
                value={fname}
                placeholder="first name"
                onIonChange={(e) => setFname(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Last Name</IonLabel>
              <IonInput
                value={lname}
                placeholder="last name"
                onIonChange={(e) => setLname(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                placeholder="email"
                onIonChange={(e) => setEmail(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                placeholder="password"
                onIonChange={(e) => setPassword(e.detail.value)}
              ></IonInput>
            </IonItem>
            <IonButton onClick={handleRegister}>Register</IonButton>{" "}
            {/* type="submit" */}
          </form>
          <IonItem>Already have an account?</IonItem>
          <IonButton href="/login">Sign In</IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Register;
