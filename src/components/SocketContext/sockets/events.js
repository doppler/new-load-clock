import { socket } from "./";

export const socketEvents = ({ setValue }) => {
  socket.on("weather-announcement", weather => {
    setValue(state => {
      return { ...state, weather };
    });
  });
  socket.on("load-announcement", loads => {
    // console.log(loads);
    setValue(state => {
      return { ...state, loads };
    });
  });
};
