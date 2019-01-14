import io from "socket.io-client";
import { socketEvents } from "./events";
import { announceLocation } from "./emit";
import { locationCode } from "../../../lib/location";

export const socket = io(
  process.env.REACT_APP_WEBSOCKET_SERVER ||
    "https://spaceland-load-clock.herokuapp.com"
);

export const initSockets = ({ setValue }) => {
  socketEvents({ setValue });
  announceLocation(locationCode);
};
