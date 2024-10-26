import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";

// Initialize 3D module
Highcharts3D(Highcharts);

const ThreeDPieChart = () => {
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: null,
      options3d: {
        enabled: true,
        alpha: 45, // Depth of the chart
        beta: 0,   // Side angle
      },
    },
    title: {
      text: "3D Pie Chart: Time Spent on Tracks",
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Time spent',
        data: [
          { name: 'Technical', y: 45, color: '#FF9999' },
          { name: 'Finance', y: 20, color: '#66B3FF' },
          { name: 'Sports & Fitness', y: 15, color: '#99FF99' },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ThreeDPieChart;