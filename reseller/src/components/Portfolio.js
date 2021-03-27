import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
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
      Item:
        "Sony PS5 PlayStation 5 (US Plug) Blu-ray Edition Console 3005718 White",
      Buyer: "Elize Tran",
    },
  ];

  const [duration, setDuration] = useState("alltime");

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <JsonToTable json={saleData} />
        </IonRow>
        <IonItemDivider></IonItemDivider>
        <IonRow>
          <ChartViewer></ChartViewer>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default Portfolio;
