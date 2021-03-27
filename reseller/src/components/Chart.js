import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = (res) => res.json();
const dataFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json"
).then(jsonify);
const schemaFetch = fetch("chartSchema.json").then(jsonify);

const dataSource = {
  chart: {},
  caption: {
    text: "Profit Over Time",
  },
  yaxis: [
    {
      plot: {
        value: "Profit",
      },
      format: {
        prefix: "$",
      },
      title: "Profit (CAD)",
    },
  ],
  legend: {
    enabled: "0",
  },
  navigator: {
    enabled: 0,
  },
  extensions: {
    standardrangeselector: {
      style: {
        "button-text": {
          fill: "#B9B9C8",
        },
        "button-text:hover": {
          fill: "#377fff",
        },
        "button-text:active": {
          fill: "#377fff",
        },
      },
    },
    customRangeSelector: {
      style: {
        "title-text": { fill: "#B9B9C8" }, //Object | String
        "title-icon": { fill: "#377fff" }, //Object | String
        "title-text:hover": { fill: "#377fff" }, //Object | String
        "title-icon:hover": { fill: "#377fff" }, //Object | String
        "title-text:active": { fill: "#377fff" }, //Object | String
        "title-icon:active": { fill: "#377fff" }, //Object | String
        "button-apply": { "background-color": "#377fff", color: "#ffffff" }, //Object | String
        "button-cancel": { "background-color": "#377fff", color: "#ffffff" }, //Object | String
        "cal-header": { "background-color": "#377fff" }, //Object | String
        "cal-date:hover": { fill: "#377fff" }, //Object | String
        "cal-activedate:hover": { "background-color": "#377fff" }, //Object | String
        "cal-selecteddate": { "background-color": "#377fff" }, //Object | String
        "cal-disableddate": { "background-color": "#ffffff" }, //Object | String
        "cal-disableddate:hover": { "background-color": "#377fff" }, //Object | String
      },
    },
  },
};

class ChartViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "600",
        height: "400",
        stroke: "#B9B9C8",
        dataSource,
      },
    };
  }

  componentDidMount() {
    this.onFetchData();
  }

  onFetchData() {
    Promise.all([dataFetch, schemaFetch]).then((res) => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          "loading"
        )}
      </div>
    );
  }
}

export default ChartViewer;