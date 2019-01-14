import React, { useContext } from "react";
import SocketContext from "./components/SocketContext/Context";
import "./App.scss";
import Header from "./components/Header";
import LoadClocks from "./components/LoadClocks";
import Footer from "./components/Footer/index";
import location from "./lib/location";

const App = () => {
  const { weather } = useContext(SocketContext);

  return (
    <div className="App">
      <Header location={location} time={weather.time} />
      <LoadClocks />
      <Footer weather={weather} />
    </div>
  );
};

export default App;
