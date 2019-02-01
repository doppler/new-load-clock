import React from "react";
import { locations } from "../../lib/location";
import "./Menu.scss";

const Menu = ({ toggleMenu, menuVisible }) => {
  const navigateTo = locationCode => {
    document.location.hash = `#${locationCode}`;
    toggleMenu();
  };
  return (
    <div className={`Menu ${menuVisible ? "visible" : null}`}>
      <ul>
        <li className="header" onClick={toggleMenu} />
        {Object.keys(locations).map(locationCode => {
          const { name } = locations[locationCode];
          return (
            <li
              className="navigable"
              onClick={() => navigateTo(locationCode)}
              key={locationCode}
            >
              {name}
            </li>
          );
        })}
        <li className="divider" />
        <li className="navigable" onClick={() => navigateTo("SETTINGS")}>
          Settings
        </li>
      </ul>
    </div>
  );
};

export default Menu;
