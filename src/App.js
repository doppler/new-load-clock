import React, { useContext } from "react";
import SocketContext from "./components/SocketContext/Context";
import "./App.scss";
import Header from "./components/Header";
import LoadClocks from "./components/LoadClocks";
import Footer from "./components/Footer/index";

const App = () => {
  const { weather } = useContext(SocketContext);

  return (
    <div className="App">
      <Header />
      <LoadClocks />
      <Footer weather={weather} />
    </div>
  );
};

export default App;
