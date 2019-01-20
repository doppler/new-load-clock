import { socket } from "./";

export const joinChannel = channel => {
  socket.emit("join", channel);
};
