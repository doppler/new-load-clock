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
    className="Grad"
    style={{ bottom: `${(grad / max) * 100}%` }}
  />
);
const Grads = ({ maxSpeed }) => {
  const grads = [];
  [5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(grad => {
    if (maxSpeed >= grad) grads.push(<Grad grad={grad} max={maxSpeed} />);
  });
  return grads.map((grad, i) => grad);
};

export default ({ windSpeeds }) => {
  const maxSpeed = Math.max(...windSpeeds);
  return (
    <div className="WindChart">
      <Grads maxSpeed={maxSpeed} />
      {windSpeeds.map((speed, i) => (
        <Bar key={i} maxSpeed={maxSpeed} speed={speed} i={i} />
      ))}
    </div>
  );
};
