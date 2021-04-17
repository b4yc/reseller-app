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
  IonText,
  IonTitle,
} from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
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
  const [sales, setSales] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [items, setItems] = useState([]);
  const [buyers, setBuyers] = useState([]);
  let data = [];
  let id;
  const api = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
  });

  useEffect(() => {
    retrieveSales();
  }, []);

  const retrieveSales = async () => {
    const url = window.location.href;
    id = url.split("/").pop();
    const saleData = {
      seller: id,
    };
    const sellerData = {
      id: id,
    };

    const api = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-type": "application/json",
      },
    });

    let response = await api
      .get(`/sales/`, { params: saleData })
      .then((response) => {
        setSales(response.data);
        return response.data;
      })
      .catch((e) => console.log(e));

    let itemResponse = await api
      .get("/items/", { params: saleData })
      .then((response) => {
        setItems(response.data);
        return response.data;
      })
      .catch((e) => console.log(e));
    // console.log(itemResponse);
    console.log(items);

    let buyerResponse = await api
      .get("/buyers/")
      .then((response) => {
        setBuyers(response.data);

        return response.data;
      })
      .catch((e) => console.log(e));
  };

  function combineData() {
    let combinedItems = [];
    for (let i = 0; i < sales.length; i++) {
      combinedItems.push({
        ...sales[i],
        ...items.find((inner) => inner.id === sales[i].item),
      });
    }
    let temp = [];
    for (let i = 0; i < combinedItems.length; i++) {
      temp.push({
        ...combinedItems[i],
        ...buyers.find((inner) => inner.id === combinedItems[i].buyer),
      });
    }
    if (!dataFetched) {
      console.log("updating data state");
      setDataFetched(true);
    }

    data = temp;
  }

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
        {combineData()}
        {console.log(data)}
        {data.map((d) => (
          <SaleTable
            ID={d.item}
            item={d.name}
            buyerFName={d.firstName}
            buyerLName={d.lastName}
            buyerEmail={d.email}
            buyerAddress={d.address}
          ></SaleTable>
        ))}
        <SaleTable></SaleTable>
        <IonItemDivider />
        {console.log(dataFetched)}
        <IonRow>
          {dataFetched ? <ChartViewer data={data}></ChartViewer> : "loading"}
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default Portfolio;
