import React from "react";
import "./StatsTable.scss";

const HighRow = ({ minute, speed }) => (
  <tr style={{ color: `hsl(${135 - speed * 6}, 100%, 50%)` }}>
    <td>{minute}min high:</td>
    <td>{speed !== -Infinity ? speed : "..."} mph</td>
  </tr>
);
export default ({ weather }) => {
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
          </tr>
          <HighRow minute={5} speed={wind5minHigh} />
          <HighRow minute={10} speed={wind10minHigh} />
          <HighRow minute={20} speed={wind20minHigh} />
        </tbody>
      </table>
    </div>
  );
};
