import React from "react";
import "./StatsTable.scss";

const windSpeedAvg = (windspeeds, timespan) => {
  const seconds = timespan * 60;
  const ticks = seconds / 2; // service reports every 2 seconds
  const sum = windspeeds.slice(0, ticks).reduce((a, b) => a + b);
  return Math.round(sum / ticks);
};

const StatsRow = ({ minute, speed, avg }) => (
  <tr style={{ color: `hsl(${135 - speed * 6}, 100%, 50%)` }}>
    <td>{minute}min high:</td>
    <td>{speed !== -Infinity ? speed : "..."}</td>
    <td>{avg}</td>
  </tr>
);

export default ({ weather }) => {
  if (!weather.prevWindSpeeds)
    return <div className="StatsTable">No Weather Data.</div>;
  const windSpeeds = weather.prevWindSpeeds
    ? [...weather.prevWindSpeeds].reverse()
    : [];
  const wind5minHigh = Math.max(...windSpeeds.slice(0, 150));
  const wind10minHigh = Math.max(...windSpeeds.slice(150, 300));
  const wind20minHigh = Math.max(...windSpeeds.slice(300, 600));

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
            <td>
              {weather.outsideTemp ? `${weather.outsideTemp}` : "..."}&deg;F
            </td>
            <td />
          </tr>
          <StatsRow
            minute={5}
            speed={wind5minHigh}
            avg={windSpeedAvg(windSpeeds, 5)}
          />
          <StatsRow
            minute={10}
            speed={wind10minHigh}
            avg={windSpeedAvg(windSpeeds, 10)}
          />
          <StatsRow
            minute={20}
            speed={wind20minHigh}
            avg={windSpeedAvg(windSpeeds, 20)}
          />
        </tbody>
      </table>
    </div>
  );
};
