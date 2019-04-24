import React, { useContext } from "react";
import { colorForSpeed } from "../../../../lib/wind-funcs";
import SettingsContext from "../../../SettingsContext/Context";

import "./WindStatsTable.scss";

let windSpeeds;

const windSpeedHigh = timespan =>
  Math.max(...windSpeeds.slice(0, (timespan * 60) / 2));

const windSpeedLow = timespan =>
  Math.min(...windSpeeds.slice(0, (timespan * 60) / 2));

const windSpeedAvg = timespan => {
  if (!windSpeeds.length) return "...";
  const ticks = (timespan * 60) / 2; // service reports every 2 seconds
  return Math.round(windSpeeds.slice(0, ticks).reduce((a, b) => a + b) / ticks);
};

const StatsRow = ({ minute }) => {
  const { displayWindLows } = useContext(SettingsContext);

  const high = windSpeedHigh(minute);
  const low = windSpeedLow(minute);
  const avg = windSpeedAvg(minute);
  return (
    <tr>
      <td>{minute} min</td>
      {displayWindLows ? (
        <td style={{ color: colorForSpeed(low) }}>{low}</td>
      ) : null}
      <td style={{ color: colorForSpeed(avg) }}>{avg}</td>
      <td style={{ color: colorForSpeed(high) }}>{high}</td>
    </tr>
  );
};

const WindStatsTable = ({ weather }) => {
  if (!weather.prevWindSpeeds)
    return <div className="WindStatsTable">No Weather Data.</div>;

  const { displayWindLows } = useContext(SettingsContext);
  windSpeeds = weather.prevWindSpeeds
    ? [...weather.prevWindSpeeds].reverse()
    : [];
  return (
    <div className="WindStatsTable">
      <table>
        <thead>
          <tr>
            <th>Winds</th>
            {displayWindLows ? <th>Low</th> : null}
            <th>Avg</th>
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
