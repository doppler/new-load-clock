import React from "react";
import Screen from "./components/Screen";
// import {
//   getLocationCode,
//   getLocationCodes,
//   getLocationName,
//   getLocationTimezone
// } from "./lib/location";
import "./App.scss";
// import Header from "./components/Header";
// import LoadClocks from "./components/LoadClocks";
// import Footer from "./components/Footer/index";
// import { announceLocation } from "./components/SocketContext/sockets/emit";
import locations from "./locations.json";
const App = () => {
  /*
  const allLocationCodes = getLocationCodes();
  const [currentCode, setCurrentCode] = useState(getLocationCode());
  const getPrevLocation = () => {
    const currIdx = allLocationCodes.indexOf(currentCode);
    if (allLocationCodes.indexOf(currentCode) === 0)
      return allLocationCodes[allLocationCodes.length - 1];
    return allLocationCodes[currIdx - 1];
  };
  const getNextLocation = () => {
    const currIdx = allLocationCodes.indexOf(currentCode);
    if (allLocationCodes.indexOf(currentCode) === allLocationCodes.length - 1)
      return allLocationCodes[0];
    return allLocationCodes[currIdx + 1];
  };
  const [prevLocation, setPrevLocation] = useState(getPrevLocation());
  const [nextLocation, setNextLocation] = useState(getNextLocation());

  const [locationName, setLocationName] = useState("");
  const [locationTimezone, setLocationTimezone] = useState(
    getLocationTimezone()
  );
  const handleHashChange = () => {
    setCurrentCode(getLocationCode());
  };
  useEffect(() => {
    window.onhashchange = () => {
      handleHashChange();
    };
    handleHashChange();
  }, []);
  useEffect(
    () => {
      setLocationName(getLocationName());
      setLocationTimezone(getLocationTimezone());
      announceLocation(getLocationCode());
      setPrevLocation(getPrevLocation());
      setNextLocation(getNextLocation());
    },
    [currentCode]
  );
  */
  return (
    <div className="App">
      <div className="Carousel">
        <div className="ViewPort">
          {Object.keys(locations).map((location, i) => (
            <Screen key={i} location={location} offset={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
