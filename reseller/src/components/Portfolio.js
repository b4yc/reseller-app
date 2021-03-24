import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Portfolio = () => {

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
    <IonPage>Portfolio
      <ReactFC {...chartConfigs} />
    </IonPage> 

  );
};

export default Portfolio;
