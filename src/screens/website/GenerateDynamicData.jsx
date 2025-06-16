import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Function to dynamically generate data (you can change this to fetch data from an API or other sources)
const generateDynamicData = () => {
  const teamAData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 50));
  const teamBData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 50));
  const teamCData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 50));

  return [
    {
      name: "TEAM A",
      type: "column",
      data: teamAData,
    },
    {
      name: "TEAM B",
      type: "area",
      data: teamBData,
    },
    {
      name: "TEAM C",
      type: "line",
      data: teamCData,
    },
  ];
};

// Chart Component
const GenerateDynamicData = () => {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
        background: "#2e2e2e", // Dark background for the chart area
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        "01/01/2003", "02/01/2003", "03/01/2003", "04/01/2003", "05/01/2003", 
        "06/01/2003", "07/01/2003", "08/01/2003", "09/01/2003", "10/01/2003", 
        "11/01/2003"
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: "#fff", // White color for x-axis labels
          },
        },
      },
      yaxis: {
        title: {
          text: "Points",
          style: {
            color: "#fff", // White color for y-axis title
          },
        },
        labels: {
          style: {
            colors: "#fff", // White color for y-axis labels
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y) => {
            if (typeof y !== "undefined") {
              return `${y.toFixed(0)} points`;
            }
            return y;
          },
        },
      },
      grid: {
        borderColor: "#444", // Grid lines in dark grey
        row: {
          colors: ["#2e2e2e", "transparent"], // Row colors for grid in alternating pattern
        },
      },
      theme: {
        mode: "dark", // Enabling dark theme
        palette: "palette1", // Choose a palette (palette1 is generally fine for dark mode)
      },
    },
  });

  useEffect(() => {
    // Dynamically generate the series data
    setState((prevState) => ({
      ...prevState,
      series: generateDynamicData(),
    }));
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div id="chart" className=" ss-card" style={{overflow:"hidden"}}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={450}
      />
    </div>
  );
};

export default GenerateDynamicData;
