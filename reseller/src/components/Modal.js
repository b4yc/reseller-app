import React, { useEffect, useState } from 'react';
import { IonContent, IonModal } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../Models/Enums';
import { Redirect, Route, Switch } from "react-router-dom";

import './ComponentModal.scss';

const Modal = ({ID}) => {
    const page = useSelector(selectRouter);
    const dispatch = useDispatch();
    const [savedPage, setSavedPage] = useState<Pages>(Pages.Home);


    return (
        <IonContent>
            <IonModal isOpen={showModal} cssClass='my-custom-class' id="myModal">
                <p>This is modal content</p>
                <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
            </IonModal>
        </IonContent>
    );
};

export default ComponentModal;
