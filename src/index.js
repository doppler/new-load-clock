import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SocketProvider from "./components/SocketContext";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <SocketProvider>
    <App />
  </SocketProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
