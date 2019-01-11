import React from "react";
import "./WindChart.scss";

const Bar = ({ speed, maxSpeed, i }) => {
  const percent = (speed / maxSpeed) * 100;
  return (
    <div
      className="Bar"
      style={{
        height: `${percent}%`,
        backgroundColor: `hsl(${120 - speed * 6}, 100%, 50%)`,
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
  if (maxSpeed === -Infinity) return null;
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

export default ({ windSpeeds }) => {
  const maxSpeed = Math.max(...windSpeeds);
  if (maxSpeed === 0) windSpeeds = windSpeeds.slice(0, 0, 5);
  return (
    <div className="WindChart">
      <Grads maxSpeed={maxSpeed} />
      <VertGrads />
      {windSpeeds.map((speed, i) => (
        <Bar key={i} maxSpeed={maxSpeed} speed={speed} i={i} />
      ))}
    </div>
  );
};