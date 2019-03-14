import React from "react";

const GhostArrows = ({ prevDirs }) => {
  if (!prevDirs) return null;
  return prevDirs
    .reverse()
    .slice(1, prevDirs.length - 1)
    .map((dir, i) => (
      <div
        key={i}
        className="Arrow previous"
        style={{
          transform: `rotate(${dir}deg)`,
          opacity: 0.25
        }}
      />
    ));
};
export default GhostArrows;
