import React from "react";

export default ({ prevDirs }) => {
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
          opacity: 0.8 - i * 0.026
        }}
      />
    ));
};
