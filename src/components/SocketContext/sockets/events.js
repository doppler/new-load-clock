import { socket } from "./";

export const socketEvents = ({ setValue }) => {
  socket.on("weather", weather => {
    setValue(state => {
      return { ...state, weather };
    });
  });
  socket.on("load-announcement", announcement => {
    const { loads } = announcement;
    setValue(state => {
      return { ...state, loads };
    });
  });
};
