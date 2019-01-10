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
  /* eslint-disable array-callback-return */
  return [5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(grad => {
    if (maxSpeed >= grad) return <Grad key={grad} grad={grad} max={maxSpeed} />;
  });
  /* eslint-enable */
};

const VertGrad = ({ grad }) => (
  <div
    className="VertGrad"
    alt={`${grad} min`}
    style={{ right: `${grad * 5}%` }}
  />
);

const VertGrads = () => {
  return [15, 10, 5].map(grad => <VertGrad key={grad} grad={grad} />);
};

export default ({ windSpeeds }) => {
  const maxSpeed = Math.max(...windSpeeds);
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
