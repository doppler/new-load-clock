import io from "socket.io-client";
import { socketEvents } from "./events";
import { announceLocation } from "./emit";
import { locationCode } from "../../../lib/location";

const SOCKETSERVER =
  process.env.REACT_APP_WEBSOCKET_SERVER ||
  "https://spaceland-load-clock.herokuapp.com";

export const socket = io(SOCKETSERVER);
socket.on("connect", msg =>
  console.log(`Established socket connection to ${SOCKETSERVER}`)
);

export const initSockets = ({ setValue }) => {
  socketEvents({ setValue });
  announceLocation(locationCode);
};
