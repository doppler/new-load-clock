import React, { useContext } from "react";
import { Footer } from "../Footer";
import SettingsContext from "../SettingsContext/Context";
import "./Settings.scss";

const weather = JSON.parse(
  `{"type":"weather","location":"ATL","windSpeed":11,"windDirection":158,"outsideTemp":42.8,"time":"2019-01-22T18:04:23.355Z","prevWindDirs":[118,105,105,133,130,136,136,118,114,124,130,130,134,134,143,143,143,139,150,158,158,172,167,158],"prevWindSpeeds":[4,5,4,2,2,2,1,1,1,2,2,2,3,3,4,5,5,5,6,6,6,9,9,9,8,8,8,7,7,6,6,8,8,6,6,6,6,6,7,7,7,8,7,5,5,4,5,5,5,4,3,4,4,4,4,4,5,7,7,7,7,6,6,6,6,5,4,4,3,3,3,3,2,2,3,3,3,2,2,1,1,0,0,0,0,0,0,0,0,0,0,1,3,5,5,5,4,4,3,3,2,2,3,3,4,8,9,7,7,6,6,10,11,11,10,9,9,9,9,8,8,9,9,11,10,8,8,7,6,5,8,8,7,8,7,7,7,8,9,10,10,11,12,12,14,14,9,10,12,12,11,10,8,7,7,5,5,7,7,7,5,3,2,2,1,1,3,4,4,5,4,3,3,3,4,4,8,8,7,7,7,7,8,8,9,9,9,9,9,7,5,5,4,3,4,4,7,8,9,9,9,11,11,9,9,7,6,6,7,7,8,6,6,6,6,6,6,5,5,4,4,3,2,2,1,1,1,1,1,1,1,0,0,2,3,3,3,3,4,5,7,7,7,8,8,8,9,8,8,9,9,7,7,7,6,6,4,3,2,2,1,0,0,0,0,0,0,0,0,2,3,3,1,1,1,1,0,4,4,6,6,9,9,11,12,10,8,8,7,8,7,7,9,9,9,8,8,9,7,6,6,6,5,5,6,6,5,5,6,6,6,5,4,5,5,5,4,5,6,6,6,4,4,4,3,2,3,9,9,7,7,7,9,9,6,4,4,4,4,6,4,4,4,4,4,5,5,6,8,8,7,7,5,4,4,4,1,2,3,4,4,4,4,3,3,3,3,6,8,8,8,6,5,4,4,5,9,10,10,9,9,9,8,8,5,5,5,5,7,11,14,12,12,15,15,14,15,15,16,13,12,12,10,11,13,14,14,14,13,15,15,14,13,12,7,9,11,10,10,11,10,11,11,10,10,11,10,10,10,9,9,9,12,13,13,13,13,11,10,11,11,11,11,10,11,11,12,12,12,11,11,10,9,10,10,9,9,9,9,9,9,8,7,7,8,7,7,7,7,9,11,14,14,13,12,11,13,13,12,10,7,7,7,7,8,6,6,5,4,5,6,6,6,8,10,10,10,7,5,5,5,4,5,5,5,5,5,5,4,4,5,6,6,6,6,6,6,7,7,8,8,7,6,6,6,6,6,6,9,10,9,10,10,10,7,5,8,8,11,9,7,7,6,5,5,4,4,3,5,9,9,9,8,9,8,8,6,6,6,6,5,8,8,6,6,5,3,5,6,6,9,10,12,12,12,8,11,12,12,11,10,8,8,6,6,8,13,13,11,10,9,8,8,6,6,7,7,10,11,11],"iat":1548180263}`
);
const Settings = () => {
  const { graph, celsius, displayWindsAloft, dispatch } = useContext(
    SettingsContext
  );
  const toggleGraph = attribute => {
    dispatch({ type: "toggleGraph", attribute });
  };
  const toggleBoolSetting = attribute => {
    dispatch({ type: "toggleBoolSetting", attribute });
  };
  return (
    <div className="Settings Screen" locationname="Settings">
      <div className="Header">Settings</div>
      <div className="LoadClocks" locationname="Settings">
        <section>
          <header>Graph</header>
          <ul>
            <li onClick={() => toggleGraph("lines")}>
              <input
                id="lines"
                type="checkbox"
                checked={graph.lines}
                readOnly
              />
              <label>Show 30-second average wind speed line graph</label>
            </li>
            <li onClick={() => toggleGraph("bars")}>
              <input id="bars" type="checkbox" checked={graph.bars} readOnly />
              <label>Show 2-second wind speed bar graph</label>
            </li>
          </ul>
        </section>
        <section>
          <header>Miscellaneous</header>
          <ul>
            <li onClick={() => toggleBoolSetting("celsius")}>
              <input type="checkbox" checked={celsius || false} readOnly />
              <label>Show temperature in degrees celsius</label>
            </li>
            <li onClick={() => toggleBoolSetting("displayWindsAloft")}>
              <input
                type="checkbox"
                checked={displayWindsAloft || false}
                readOnly
              />
              <label>Display winds aloft</label>
            </li>
          </ul>
        </section>
      </div>
      <Footer weather={weather} fakeData={true} />
      {/* ugly hack to make positioning of "Settings" header thing correct */}
      <div className="WindsAloft" />
    </div>
  );
};

export default Settings;
