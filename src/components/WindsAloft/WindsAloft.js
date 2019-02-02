import React, { useState, useEffect } from "react";
import "./WindsAloft.scss";

const WindsAloft = () => {
  const [windsAloft, setWindsAloft] = useState([]);

  const fetchWindsAloftData = async (region, station) => {
    const res = await fetch(
      `https://winds-aloft-json.herokuapp.com/forecast/${region}/${station}.json`,
      {
        mode: "cors",
        headers: { "Content-Type": "application/json" }
      }
    );
    const json = await res.json();
    let windsAloft = json.dataRows[0].forecast;
    console.log({ windsAloft });
    setWindsAloft(windsAloft);
  };
  useEffect(() => {
    fetchWindsAloftData("mia", "ATL");
  }, []);
  return (
    <div className="WindsAloft">
      {windsAloft.map(forecast => (
        <div key={forecast.altitude}>
          {forecast.altitude.toString().replace(/000/, "K")}
        </div>
      ))}
    </div>
  );
};

export default WindsAloft;
