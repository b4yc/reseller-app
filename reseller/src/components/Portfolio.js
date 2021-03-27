import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonItemDivider,
} from "@ionic/react";
import React, { useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import { JsonToTable } from "react-json-to-table";
import ChartViewer from "./Chart";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme, TimeSeries);
import SaleTable from "./SaleTable";

const Portfolio = () => {
  const saleData = [
    {
      ID: 1,
      Item: "2021 Pokemon TCG Sword & Shield Shining Fates Elite Trainer Box",
      Buyer: "Thomas Kahessay",
    },
    {
      ID: 2,
      Item: "Jordan 1 Retro High Patina",
      Buyer: "Baylee Cheung",
    },
    {
      ID: 3,
      Item: "Sony PS5 PlayStation 5 (US Plug) Blu-ray Edition Console 3005718 White",
      Buyer: "Elize Tran",
    },
  ];

  const [duration, setDuration] = useState("alltime");

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol className="header" size="1">ID</IonCol>
          <IonCol className="header" size="8">Item</IonCol>
          <IonCol className="header" size="3">Buyer</IonCol>
        </IonRow>
        <IonItemDivider></IonItemDivider>
        {saleData.map((sale) => (
          <SaleTable
            ID={sale.ID}
            item={sale.Item}
            buyer={sale.Buyer}
          />
        ))}
        <IonItem>
          <IonLabel>Duration</IonLabel>
          <IonSelect
            value={duration}
            placeholder="Select One"
            onIonChange={(e) => setDuration(e.detail.value)}
          >
            <IonSelectOption value="day">One Day</IonSelectOption>
            <IonSelectOption value="week">One Week</IonSelectOption>
            <IonSelectOption value="month">One Month</IonSelectOption>
            <IonSelectOption value="year">One Year</IonSelectOption>
            <IonSelectOption value="alltime">All Time</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonRow>
          <ChartViewer></ChartViewer>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default Portfolio;
