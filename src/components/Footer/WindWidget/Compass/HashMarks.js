import React from "react";

export default () => {
  return [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
    <div
      key={deg}
      className="Hashmark"
      style={{ transform: `rotate(${deg}deg)` }}
    />
  ));
};
