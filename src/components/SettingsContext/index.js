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
    default:
      return state;
  }
};

const SettingsProvider = props => {
  // const [value, setValue] = useState(initialState);
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
