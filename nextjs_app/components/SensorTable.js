"use client";

export default function SensorTable({ data }) {
  return (
    <div
      style={{
        maxHeight: "400px", // Set the max height for the scrollable area
        overflowY: "auto",  // Enable vertical scrolling
        border: "1px solid #ccc", // Optional: Add a border for better visuals
        padding: "10px",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Timestamp</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Temperature (°C)</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice()
            .reverse() // Reverse the array so newest data appears at the top
            .map((sensor, index) => (
              <tr key={index}>
                <td style={{ padding: "8px", borderBottom: "1px solid #f0f0f0" }}>
                  {new Date(sensor.timestamp).toLocaleString()}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #f0f0f0" }}>
                  {sensor.temperature}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #f0f0f0" }}>
                  {sensor.humidity}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
