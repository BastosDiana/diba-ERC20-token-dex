import React from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import Spinner from "./Spinner";
import { chartOptions } from "./PriceChart.config";
import {
  priceChartLoadedSelector,
  priceChartSelector,
} from "../store/selectors";

const PriceChart = () => {
  const priceChartLoaded = useSelector(priceChartLoadedSelector);
  const priceChart = useSelector(priceChartSelector);

  const priceSymbol = () => {
    let output;
    if (priceChart.lastPriceChange === "+") {
      output = <span className="text-success">&#9650;</span>; // Green up tiangle
    } else {
      output = <span className="text-danger">&#9660;</span>; // Red down triangle
    }
    return output;
  };

  const showPriceChart = () => {
    return (
      <div className="price-chart">
        <div className="price">
          <h4>
            DIBA/ETH &nbsp; {priceSymbol()} &nbsp; {priceChart.lastPrice}
          </h4>
        </div>
        <Chart
          options={chartOptions}
          series={priceChart.series}
          type="candlestick"
          width="100%"
          height="100%"
        />
      </div>
    );
  };

  return (
    <div className="card bg-dark text-white">
      <div className="card-header">Price Chart</div>
      <div className="card-body">
        {priceChartLoaded ? showPriceChart() : <Spinner />}
      </div>
    </div>
  );
};

export default PriceChart;
