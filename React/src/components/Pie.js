import React from "react";
import { Doughnut } from "react-chartjs-2";
import useWindowSize from "../hooks/useWindowSize";

// Creates a donut pie chart and colors it based on its score
export default function Pie({ score }) {
  const width = useWindowSize();

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "80%",
    animation: true,
  };

  const data = {
    datasets: [
      {
        labels: ["ENergize Score"],
        data: [score, 100 - score],
        backgroundColor: [getColour(score), "#FFFFFF"],
      },
    ],
  };

  function getColour(number) {
    if (number > 90) return "#11b31e";
    else if (number > 84) return "#57a000";
    else if (number > 78) return "#748d00";
    else if (number > 72) return "#877800";
    else if (number > 66) return "#936200";
    else if (number > 62) return "#9b4a00";
    else if (number > 56) return "#9c2f00";
    else return "#990707";
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h6
        style={{
          position: "absolute",
          fontSize: width === "lg" ? "60px" : "25vw",
          color: getColour(score),
        }}
      >
        {score}
      </h6>
      <Doughnut data={data} options={options} />
    </div>
  );
}
