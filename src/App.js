import React, { useState, useEffect } from "react";
import { getLocationName, getLocationTimezone } from "./lib/location";
import "./App.scss";
import Header from "./components/Header";
import LoadClocks from "./components/LoadClocks";
import Footer from "./components/Footer/index";

const App = () => {
  const [locationName, setLocationName] = useState("");
  const [locationTimezone, setLocationTimezone] = useState(
    getLocationTimezone()
  );
  const handleHashChange = () => {
    setLocationName(getLocationName());
    setLocationTimezone(getLocationTimezone());
  };
  useEffect(
    () => {
      window.onhashchange = () => {
        handleHashChange();
      };
      setLocationName(getLocationName());
      setLocationTimezone(getLocationTimezone());
    },
    [locationName, locationTimezone]
  );
  return (
    <div className="App">
      <Header locationName={locationName} locationTimezone={locationTimezone} />
      <LoadClocks locationName={locationName} />
      <Footer />
    </div>
  );
};

export default App;
