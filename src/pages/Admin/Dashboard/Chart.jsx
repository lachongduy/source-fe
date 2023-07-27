import { Typography } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";
const Chart = ({ data }) => {
  const series = [
    {
      name: "Đã bán",
      data: data?.series,
    },
  ];

  const colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#546E7A",
    "#26A69A",
    "#D10CE8",
  ];

  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: data?.categories,
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `${value}`;
        },
      },
    },
  };
  return (
    <>
      <Typography variant="h6" className="text-center">
        Biểu đồ thống kê đơn hàng đã bán theo ngày
      </Typography>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
};

export default Chart;
