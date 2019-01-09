import React from "react";
import "./StatsTable.scss";

export default ({ weather }) => {
  const windSpeeds = [...weather.prevWindSpeeds].reverse();

  const wind5minHigh = Math.max(...windSpeeds.slice(0, 150));
  const wind10minHigh = Math.max(...windSpeeds.slice(150, 300));
  const wind20minHigh = Math.max(...windSpeeds.slice(300, 600));

  return (
    <div className="StatsTable">
      <table>
        <tbody>
          <tr>
            <td>Temperature:</td>
            <td>{weather.outsideTemp}&deg;F</td>
          </tr>
          <tr>
            <td>5min high:</td>
            <td>{wind5minHigh} mph</td>
          </tr>
          <tr>
            <td>10min high:</td>
            <td>{wind10minHigh} mph</td>
          </tr>
          <tr>
            <td>20min high:</td>
            <td>{wind20minHigh} mph</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
