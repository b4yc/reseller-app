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
import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import { JsonToTable } from "react-json-to-table";
import ChartViewer from "./Chart";
import SaleTable from "./SaleTable";
import axios from "axios";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme, TimeSeries);

let Portfolio = () => {
  const url = window.location.href;
  const id = url.split("/").pop();
  const [sales, setSales] = useState([]);

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
        .get("/sales/", { params: userData })
        .then((res) => {
          setSales(res.data);
          console.log(res.data);
          console.log(sales);
        })
        .catch((error) => {
          console.log(error.response);
        });
      return () => {
        ignore = true;
      };
    }
  }, []);

  const [duration, setDuration] = useState("alltime");

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol className="header" size="1">
            ID
          </IonCol>
          <IonCol className="header" size="8">
            Item
          </IonCol>
          <IonCol className="header" size="3">
            Buyer
          </IonCol>
        </IonRow>
        {sales.map((sale) => (
          <SaleTable ID={sale.id} item={sale.item} buyer={sale.buyer} />
        ))}
        <IonItemDivider />
        <IonRow>
          <ChartViewer></ChartViewer>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

Portfolio = React.memo(Portfolio);

export default Portfolio;
