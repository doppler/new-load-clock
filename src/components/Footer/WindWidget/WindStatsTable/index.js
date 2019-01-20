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

export default ({ weather }) => {
  if (!weather.prevWindSpeeds)
    return <div className="StatsTable">No Weather Data.</div>;
  windSpeeds = weather.prevWindSpeeds
    ? [...weather.prevWindSpeeds].reverse()
    : [];
  return (
    <div className="StatsTable">
      <table>
        <tbody>
          <tr
            style={{
              color: `hsl(${280 - weather.outsideTemp * 3}, 100%, 50%)`
            }}
          >
            <td>Temperature:</td>
            <td colSpan={2}>
              {weather.outsideTemp ? `${weather.outsideTemp}` : "..."}&deg;F
            </td>
            <td />
          </tr>
          <tr style={{ fontSize: "0.5rem" }}>
            <td />
            <td>Avg</td>
            <td>High</td>
          </tr>
          {[5, 10, 20].map(i => (
            <StatsRow key={i} minute={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
