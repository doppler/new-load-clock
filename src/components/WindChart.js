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

const Grads = ({ maxSpeed }) => {
  const grads = [];
  if (maxSpeed >= 5) {
    grads.push(
      <div
        key={5}
        className="Grad five"
        style={{ bottom: `${(5 / maxSpeed) * 100}%` }}
      >
        5 mph
      </div>
    );
  }
  if (maxSpeed >= 10) {
    grads.push(
      <div
        key={10}
        className="Grad ten"
        style={{ bottom: `${(10 / maxSpeed) * 100}%` }}
      >
        10 mph
      </div>
    );
  }
  if (maxSpeed >= 15) {
    grads.push(
      <div
        key={15}
        className="Grad fifteen"
        style={{ bottom: `${(15 / maxSpeed) * 100}%` }}
      >
        15 mph
      </div>
    );
  }
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
