import io from "socket.io-client";
import { socketEvents } from "./events";
import { joinChannel } from "./emit";

const SOCKETSERVER =
  process.env.REACT_APP_WEBSOCKET_SERVER ||
  "https://spacelandclocks.herokuapp.com";

export const socket = io(SOCKETSERVER);
socket.on("connect", msg =>
  console.debug(`Established socket connection to ${SOCKETSERVER}`)
);

export const initSockets = ({ setValue }) => {
  socketEvents({ setValue });
  joinChannel("announcements");
};
