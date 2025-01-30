"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SensorTable from "../components/SensorTable";
import SensorGraph from "../components/SensorGraph";

export default function Home() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeDuration, setTimeDuration] = useState("1h"); // Default to last 1 hour

  const durationOptions = [
    { label: "Last 1 minute", value: "1m" },
    { label: "Last 1 hour", value: "1h" },
    { label: "Last 24 hours", value: "24h" },
    { label: "All Time", value: "all" }
  ];

  // Function to filter data based on selected time duration
  const filterDataByDuration = (data, duration) => {
    const now = new Date();
    let filteredData = data;

    switch (duration) {
      case "1m":
        filteredData = data.filter(sensor => new Date(sensor.timestamp) > new Date(now - 1 * 60 * 1000));
        break;
      case "1h":
        filteredData = data.filter(sensor => new Date(sensor.timestamp) > new Date(now - 60 * 60 * 1000));
        break;
      case "24h":
        filteredData = data.filter(sensor => new Date(sensor.timestamp) > new Date(now - 24 * 60 * 60 * 1000));
        break;
      case "all":
      default:
        break; // Show all data
    }

    return filteredData;
  };

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
        const filteredData = filterDataByDuration(response.data, timeDuration); // Apply filter
        setSensorData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setLoading(false);
      }
    };

    fetchSensorData(); // Fetch immediately on mount
  }, [timeDuration]); // Re-run on timeDuration change

  return (
    <div>
      <h1>Sensor Data Visualization</h1>
      
      {/* Duration Filter */}
      <select
        value={timeDuration}
        onChange={(e) => setTimeDuration(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        {durationOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading sensor data...</p>
      ) : (
        <>
          <SensorGraph data={sensorData} timeDuration={timeDuration} />
          <SensorTable data={sensorData} />
        </>
      )}
    </div>
  );
}
