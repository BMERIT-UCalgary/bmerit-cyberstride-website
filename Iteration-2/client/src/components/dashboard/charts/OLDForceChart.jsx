import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useDistanceCalculation } from "../../../hooks/useDistanceCalculation";

function ForceChart({ data }) {

  useEffect(() => {
    console.log("Force Data 🎇: ", data);
  }, [data])

  if (!data || !Array.isArray(data) || data.length === 0 || !data[0].data) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }


  const chartWidth = Math.max(data[0].data.length * 20, 1000);

  return (
    <div className="w-full h-[93%] overflow-x-auto">
      <div
        className="h-full"
        style={{ width: `${chartWidth}px` }}
      >
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          xScale={{
            type: "linear",
            min: "auto",
            max: "auto"
          }}
          yScale={{
            type: "linear",
            min: "0",
            max: "100",
            stacked: false,
            reverse: false,
          }}
          axisBottom={{
            legend: "Time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            legend: "Force (N)",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={{ scheme: "category10" }}
          lineWidth={3}
          pointSize={8}
          pointBorderWidth={2}
          enableGridX={false}
          enableGridY={true}
          useMesh={true}
        />
      </div>
    </div>
  );
}

export default ForceChart;