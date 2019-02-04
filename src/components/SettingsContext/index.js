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
    case "toggleBoolSetting":
      return { ...state, [action.attribute]: !state[action.attribute] };
    default:
      return state;
  }
};

const SettingsProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("lc.settings", JSON.stringify(state));
  }, [state]);
  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
