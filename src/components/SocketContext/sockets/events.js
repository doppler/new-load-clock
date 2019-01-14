import { socket } from "./";

export const socketEvents = ({ setValue }) => {
  socket.on("weather", weather => {
    setValue(state => {
      return { ...state, weather };
    });
  });
};
