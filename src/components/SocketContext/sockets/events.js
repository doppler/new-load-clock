import { socket } from "./";

export const socketEvents = ({ setValue }) => {
  socket.on("weather", weather => {
    console.debug(new Date().toString(), "'weather' from socket");
    setValue(state => {
      return { ...state, weather };
    });
  });
  socket.on("load-announcement", announcement => {
    console.debug(new Date().toString(), "'load-announcement' from socket");
    const { loads } = announcement;
    setValue(state => {
      return { ...state, loads };
    });
  });
};
