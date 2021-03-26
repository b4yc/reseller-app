import { IonContent, IonPage, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import { JsonToTable } from "react-json-to-table";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Portfolio = () => {

  const saleData = [
    {
      "ID": 1,
      "Item": "2021 Pokemon TCG Sword & Shield Shining Fates Elite Trainer Box",
      "Buyer": "Thomas Kahessay"
    },
    {
      "ID": 2,
      "Item": "Jordan 1 Retro High Patina",
      "Buyer": "Baylee Cheung"
    },
    {
      "ID": 3,
      "Item": "Sony PS5 PlayStation 5 (US Plug) Blu-ray Edition Console 3005718 White",
      "Buyer": "Elize Tran"
    }
  ]

  const dataSource = {
    chart: {
      caption: "Total Profit",
      subCaption: "",
      xAxisName: "2020",
      yAxisName: "Profit (CAD)",
      numberSuffix: "",
      theme: "fusion"
    },
    data: [
      { label: "January", value: "30" },
      { label: "February", value: "30" },
      { label: "March", value: "100" },
      { label: "April", value: "115" },
      { label: "May", value: "140" },
      { label: "June", value: "180" },
      { label: "July", value: "260" },
      { label: "August", value: "290" }
    ]
  };
  const chartConfigs = {
    type: "line",
    width: 600,
    height: 400,
    dataFormat: "json",
    dataSource: dataSource
  };

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <JsonToTable json={saleData}/>
        </IonRow>
        <IonRow>
        <ReactFC {...chartConfigs} />
        </IonRow>
      </IonGrid>
    </IonPage> 

  );
};

export default Portfolio;
