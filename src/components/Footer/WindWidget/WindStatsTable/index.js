import React from "react";
import "./StatsTable.scss";

let windSpeeds;

const windSpeedHigh = timespan => {
  return Math.max(...windSpeeds.slice(0, (timespan * 60) / 2));
};

const windSpeedAvg = timespan => {
  if (!windSpeeds.length) return "...";
  const ticks = (timespan * 60) / 2; // service reports every 2 seconds
  const slice = windSpeeds.slice(0, ticks);
  const sum = slice.reduce((a, b) => a + b);
  return Math.round(sum / ticks);
};

const colorForSpeed = speed => {
  return `hsl(${135 - speed * 6}, 100%, 50%)`;
};
const StatsRow = ({ minute }) => {
  const high = windSpeedHigh(minute);
  const avg = windSpeedAvg(minute);
  return (
    <tr>
      <td>{minute} minute</td>
      <td style={{ color: colorForSpeed(avg) }}>{avg}</td>
      <td style={{ color: colorForSpeed(high) }}>{high}</td>
    </tr>
  );
};

const WindStatsTable = ({ weather }) => {
  if (!weather.prevWindSpeeds)
    return <div className="StatsTable">No Weather Data.</div>;
  windSpeeds = weather.prevWindSpeeds
    ? [...weather.prevWindSpeeds].reverse()
    : [];
  return (
    <div className="StatsTable">
      <table>
        <thead>
          <tr>
            <th>Wind Speeds</th>
            <th>Averege</th>
            <th>High</th>
          </tr>
        </thead>
        <tbody>
          {[5, 10, 20].map(i => (
            <StatsRow key={i} minute={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default WindStatsTable;
