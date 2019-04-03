require("dotenv").config();
const fs = require("fs");
const path = require("path");
const io = require("socket.io-client");

const SOCKETSERVER =
  process.env.REACT_APP_WEBSOCKET_SERVER ||
  "https://spacelandclocks.herokuapp.com";

const LOGDIR = path.join(__dirname, "logs");
console.log(`Logging to ${LOGDIR}`);

const socket = io(SOCKETSERVER);

socket.on("connect", msg => {
  console.log(`Established connection to ${SOCKETSERVER}`);
  socket.emit("join", "announcements");
});

socket.on("load-announcement", announcement => {
  Object.keys(announcement).forEach(location => {
    if (announcement[location].loads.length) {
      fs.writeFile(
        path.join(LOGDIR, `${location}.json.txt`),
        JSON.stringify(announcement[location]) + "\n",
        { flag: "a+" },
        err => {
          if (err) console.log(err);
        }
      );
    }
  });
});
