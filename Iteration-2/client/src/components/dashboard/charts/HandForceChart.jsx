import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

function HandForceChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const timePoints = Array.from({ length: 16 }, (_, i) => `${i}s`); // 0s to 15s

    const leftHandData = {
      id: "Left Hand",
      color: "blue",
      data: timePoints.map((x, i) => ({
        x,
        y: 40 + Math.floor(Math.random() * 10), // 60 ± 5
      })),
    };

    const rightHandData = {
      id: "Right Hand",
      color: "green",
      data: timePoints.map((x, i) => {
        let y = 80 + Math.floor(Math.random() * 10);
        if (i > 7) {
          // After 7s, gradually decrease from 80 to 60
          y = 80 - ((i - 7) * (40 / 8)); // Linear drop to 60 by 15s
        }
        if (i > 10) {
          y = 40 + Math.floor(Math.random() * 8)
        }
        return { x, y: Math.round(y) };
      }),
    };

    setChartData([leftHandData, rightHandData]);
  }, []);

  if (!chartData.length) {
    return <div>Loading hand force chart...</div>;
  }

  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 20, right: 20, bottom: 70, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: 100,
        stacked: false,
        reverse: false,
      }}
      axisBottom={{
        legend: "Time",
        legendOffset: 36,
        legendPosition: "middle",
        tickValues: ["0s", "5s", "10s", "15s"],
      }}
      axisLeft={{
        legend: "Force %",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={(d) => d.color}
      lineWidth={3}
      pointSize={6}
      pointBorderWidth={2}
      enableGridX={false}
      enableGridY={true}
      useMesh={true}
    />
  );
}

export default HandForceChart;
