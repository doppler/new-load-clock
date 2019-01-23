import React, { useReducer, useEffect } from "react";
import SettingsContext from "./Context";
import { initialState } from "./initalState";

const reducer = (state, action) => {
  switch (action.type) {
    case "toggleGraph":
      const graph = {
        ...state.graph,
        [action.attribute]: !state.graph[action.attribute]
      };
      return { ...state, graph };
    case "toggleHeader":
      const header = {
        ...state.header,
        [action.attribute]: !state.header[action.attribute]
      };
      return { ...state, header };
    default:
      return state;
  }
};

const SettingsProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(
    () => {
      localStorage.setItem("lc.settings", JSON.stringify(state));
    },
    [state]
  );
  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
