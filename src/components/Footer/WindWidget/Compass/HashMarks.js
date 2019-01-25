import React from "react";

const HashMarks = () => {
  return [30, 60, 120, 150, 210, 240, 300, 330].map(deg => (
    <div
      key={deg}
      className="Hashmark"
      style={{ transform: `rotate(${deg}deg)` }}
    />
  ));
};
export default HashMarks;
