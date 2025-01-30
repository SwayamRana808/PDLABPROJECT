"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from "chart.js";
import { format } from "date-fns"; // For formatting timestamps
import 'chartjs-adapter-date-fns';  // Import the date adapter

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

export default function SensorGraph({ data, timeDuration }) {
  // Prepare chart data with filtering based on time duration
  const filteredData = data.map(sensor => ({
    timestamp: new Date(sensor.timestamp),
    temperature: sensor.temperature,
    humidity: sensor.humidity,
  }));

  // Chart.js time scale config
  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: timeDuration === "1m" ? "minute" : timeDuration === "1h" ? "hour" : "day", // Set time unit based on selected filter
          stepSize: timeDuration === "1m" ? 1 : timeDuration === "1h" ? 1 : 1, // Adjust step size based on filter
        },
      },
    },
  };

  // Prepare chart data
  const chartData = {
    labels: filteredData.map(sensor => sensor.timestamp),
    datasets: [
      {
        label: "Temperature (°C)",
        data: filteredData.map(sensor => sensor.temperature),
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
      {
        label: "Humidity (%)",
        data: filteredData.map(sensor => sensor.humidity),
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
      }
    ]
  };

  return <Line data={chartData} options={chartOptions} />;
}
