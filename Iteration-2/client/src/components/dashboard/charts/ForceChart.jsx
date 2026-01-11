import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function ForceChart({ data }) {
  const [traces, setTraces] = useState([]);

  useEffect(() => {
    console.log("Force Data (before processing) 🎇: ", data);

    if (!data || !Array.isArray(data) || data.length === 0 || !data[0].data) {
      setTraces([]);
      return;
    }

    const transformed = data.map((series) => {
      // Get the first timestamp to make times relative
      const firstTime = Number(series.data[0].x.replace("s", ""));

      return {
        x: series.data.map((point) =>
          // convert to seconds and make relative to first timestamp
          (Number(point.x.replace("s", "")) - firstTime) / 1000
        ),
        y: series.data.map((point) => point.y),
        type: "scattergl",
        mode: "lines",
        name: series.id,
        line: { width: 3 },
      };
    });

    console.log("Plotly Traces (after processing) 🌀: ", transformed);
    setTraces(transformed);
  }, [data]);

  if (traces.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[93%] overflow-x-auto">
      <Plot
        data={traces}
        layout={{
          autosize: true,
          margin: { l: 50, r: 20, b: 50, t: 20 },
          xaxis: {
            title: "Time (s)",
            type: "linear",
          },
          yaxis: { title: "Force (N)", range: [0, 100] },
          showlegend: true,
          legend: {
            orientation: "h",
            x: 0,
            y: -0.2,
            xanchor: "left",
            yanchor: "top",
          },
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
      />
    </div>
  );
}

export default ForceChart;
