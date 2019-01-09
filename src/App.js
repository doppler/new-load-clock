import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Compass from "./components/Compass";

const io = require("socket.io-client");

const App = () => {
  const { current: socket } = useRef(io("http://localhost:3001"));
  const [weather, setWeather] = useState({});

  useEffect(() => {
    try {
      console.log("opening socket");
      socket.open();
      socket.on("weather", data => {
        if (data) setWeather(data);
        // console.log("weather", data);
      });
      socket.on("close", () => console.log("SOCKET CLOSED"));
    } catch (error) {
      console.log(error);
    }
    // seems that after awhile websocket gets fucked up and memory leaks or
    // something. just reload every minute.
    // let reloadTimeout = setTimeout(() => {
    //   document.location.reload();
    // }, 1000 * 60);
    return () => {
      socket.close();
      // clearTimeout(reloadTimeout);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Compass weather={weather} />
        <p>Time: {weather.time}</p>
      </header>
    </div>
  );
};

export default App;
