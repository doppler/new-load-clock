import React, { useContext } from "react";
import SocketContext from "./components/SocketContext/Context";
import "./App.scss";
import Header from "./components/Header";
import LoadClocks from "./components/LoadClocks";
import Footer from "./components/Footer/index";
import { validLocations, getLocationFromPathName } from "./lib/location";

const location = getLocationFromPathName();

const App = () => {
  const { weather } = useContext(SocketContext);

  return (
    <div className="App">
      <Header location={validLocations[location]} time={weather.time} />
      <LoadClocks />
      <Footer weather={weather} />
    </div>
  );
};

export default App;
