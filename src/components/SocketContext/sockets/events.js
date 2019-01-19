import { socket } from "./";

export const socketEvents = ({ setValue }) => {
  socket.on("weather-announcement", weather => {
    // console.debug(new Date().toString(), "'weather-announcement' from socket");
    setValue(state => {
      return { ...state, weather };
    });
  });
  socket.on("load-announcement", loads => {
    // console.debug(new Date().toString(), "'load-announcement' from socket");
    setValue(state => {
      return { ...state, loads };
    });
  });
};
