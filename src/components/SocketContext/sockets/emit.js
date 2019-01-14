import { socket } from "./";

export const announceLocation = location => {
  socket.emit("location", location);
};
