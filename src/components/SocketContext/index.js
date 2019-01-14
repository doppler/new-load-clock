import React, { useState, useEffect } from "react";
import SocketContext from "./Context";
import { initSockets } from "./sockets";

const SocketProvider = props => {
  const [value, setValue] = useState({
    weather: {},
    loads: []
  });
  useEffect(
    () => {
      initSockets({ setValue });
    },
    [initSockets]
  );

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
