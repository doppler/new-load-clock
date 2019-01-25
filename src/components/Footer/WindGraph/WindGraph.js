import React from "react";
import ChartistGraph from "react-chartist";
import {
  averageEachRange,
  maxEachRange,
  colorForSpeed
} from "../../../lib/wind-funcs";

import "./WindGraph.scss";

const Bar = ({ speed, maxSpeed, i }) => {
  const percent = (speed / maxSpeed) * 100;
  return (
    <div
      className="Bar"
      style={{
        height: `${percent}%`,
        backgroundColor: colorForSpeed(speed),
        boxShadow: `0px -1px 5px ${colorForSpeed(speed)}`,
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
      bottom: `calc(${(val / 25) * 100}% - 2px)`,
      color: color,
      backgroundColor: color
    }}
  />
);
export const GraphAverages = ({ prevWindSpeeds }) => {
  if (!prevWindSpeeds || !prevWindSpeeds.length) return null;
  const averages = averageEachRange(prevWindSpeeds);
  return (
    <div className="GraphAverages">
      {averages.map((avg, i) => (
        <GraphDot val={avg} i={i} key={i} color={"lightblue"} />
      ))}
    </div>
  );
};
export const GraphHighs = ({ prevWindSpeeds }) => {
  if (!prevWindSpeeds || !prevWindSpeeds.length) return null;
  const highs = maxEachRange(prevWindSpeeds);
  return (
    <div className="GraphHighs">
      {highs.map((high, i) => (
        <GraphDot val={high} i={i} key={i} color={"lightpink"} />
      ))}
    </div>
  );
};
export const LineGraph = ({ prevWindSpeeds }) => {
  if (!prevWindSpeeds || !prevWindSpeeds.length) return null;
  const highs = maxEachRange(prevWindSpeeds);
  const avgs = averageEachRange(prevWindSpeeds);
  const data = {
    series: [avgs, highs]
  };
  const options = {
    axisX: {
      offset: 0,
      showLabel: false,
      showGrid: false
    },
    axisY: {
      offset: 0,
      showLabel: false,
      showGrid: false,
      scaleMinSpace: 1
    },
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    showArea: false,
    showLine: true,
    showPoint: false,
    low: 0,
    high: 25
  };
  return (
    <div className="LineGraph">
      <ChartistGraph data={data} options={options} type="Line" />
    </div>
  );
};
export const GraphBackground = () => (
  <div className="GraphBackground">
    <Grads maxSpeed={maxSpeed} />
    <VertGrads />
  </div>
);
