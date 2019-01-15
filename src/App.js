import React from "react";
import "./App.scss";
import Header from "./components/Header";
import LoadClocks from "./components/LoadClocks";
import Footer from "./components/Footer/index";

const App = () => {
  return (
    <div className="App">
      <Header />
      <LoadClocks />
      <Footer />
    </div>
  );
};

export default App;
