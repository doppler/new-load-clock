import React from "react";
import { averageEachRange, maxEachRange } from "./lib/wind-data-funcs";
import "./WindChart.scss";

const Bar = ({ speed, maxSpeed, i }) => {
  const percent = (speed / maxSpeed) * 100;
  return (
    <div
      className="Bar"
      style={{
        height: `${percent}%`,
        backgroundColor: `hsl(${120 - speed * 6}, 100%, 50%)`,
        boxShadow: `0px -1px 5px hsl(${120 - speed * 6}, 100%, 75%)`,
        left: `${(i / 600) * 100}%`
      }}
    />
  );
};

const Grad = ({ grad, max }) => (
  <div
    alt={`${grad} mph`}
    key={grad}
    className={`Grad ${grad % 5 === 0 ? "label" : null}`}
    style={{ bottom: `${(grad / max) * 100}%` }}
  />
);

const Grads = ({ maxSpeed }) => {
  if (maxSpeed === -Infinity || maxSpeed === 0) maxSpeed = 5;
  return Array.from(Array(maxSpeed)).map((_, i) => (
    <Grad key={i} grad={i + 1} max={maxSpeed} />
  ));
};

const VertGrad = ({ grad }) => (
  <div
    className={`VertGrad ${grad % 5 === 0 ? "label" : null}`}
    alt={`${grad} min`}
    style={{ right: `${grad * 5}%` }}
  />
);

const VertGrads = () => {
  return Array.from(new Array(19).fill(0)).map((_, i) => {
    return <VertGrad key={i} grad={i + 1} />;
  });
};

const maxSpeed = 25;

export const GraphBars = ({ prevWindSpeeds }) => {
  return (
    <div className="GraphBars">
      {prevWindSpeeds &&
        prevWindSpeeds.map((speed, i) =>
          speed > 0 ? (
            <Bar key={i} maxSpeed={maxSpeed} speed={speed} i={i} />
          ) : null
        )}{" "}
    </div>
  );
};

const GraphDot = ({ val, i, color }) => (
  <div
    className="GraphDot"
    style={{
      left: `${((i * 15) / 600) * 100}%`,
      bottom: `${(val / 25) * 100}%`,
      color: color,
      backgroundColor: color
    }}
  />
);
export const GraphAverages = ({ prevWindSpeeds }) => {
  const averages = averageEachRange(prevWindSpeeds);
  return (
    <div className="GraphAverages">
      {averages.map((avg, i) => (
        <GraphDot val={avg} i={i} key={i} color={"white"} />
      ))}
    </div>
  );
};
export const GraphHighs = ({ prevWindSpeeds }) => {
  const highs = maxEachRange(prevWindSpeeds);
  return (
    <div className="GraphHighs">
      {highs.map((high, i) => (
        <GraphDot val={high} i={i} key={i} color={"red"} />
      ))}
    </div>
  );
};
export const GraphBackground = () => (
  <div className="GraphBackground">
    <Grads maxSpeed={maxSpeed} />
    <VertGrads />
  </div>
);

// const WindChart = ({ prevWindSpeeds }) => {
//   // let ms = Math.max(...windSpeeds);
//   // const maxSpeed = ms < 5 ? 5 : ms;
//   return (
//     <div className="WindChart">
//       <Bars prevWindSpeeds={prevWindSpeeds} />
//     </div>
//   );
// };
// export default WindChart;
