require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const jwt = require("jsonwebtoken");
const io = require("socket.io")(server);
const path = require("path");
const locations = require("./src/locations.json");
const PORT = process.env.PORT || 5000;
// const fs = require("fs");
// const saveWeatherStream = fs.createWriteStream(
//   "./savedWeatherAnnouncements.txt",
//   { flags: "a+" }
// );
server.listen(PORT);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  return;
});
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.json({ error: "Not Found" });
  return;
});
const loadAnnouncements = {};
const weatherAnnouncements = {};
Object.keys(locations).forEach(location => {
  loadAnnouncements[location] = { loadsFlownToday: 0 };
  weatherAnnouncements[location] = {};
});

io.sockets.on("connection", socket => {
  socket.on("join", channel => {
    console.log("join", channel);
    socket.leaveAll();
    socket.join(channel);
    if (channel === "announcements") {
      socket.emit("load-announcement", loadAnnouncements);
      socket.emit("weather-announcement", weatherAnnouncements);
    }
  });

  socket.on("jwt-weather-record", token => {
    jwt.verify(token, process.env.JWT_SECRET, (err, record) => {
      if (err) {
        console.log(err.message);
        return false;
      }
      // console.log("jwt-weather-record", record.location, record.time);
      weatherAnnouncements[record.location] = record;
      // keep this around for testing for now
      // Object.keys(locations).forEach(location => {
      //   weatherAnnouncements[location] = record;
      // });
    });
  });
  socket.on("jwt-load-announcement", token => {
    jwt.verify(token, process.env.JWT_SECRET, (err, announcement) => {
      if (err) {
        console.log(err.message);
        return false;
      }
      console.log("jwt-load-announcment", JSON.stringify(announcement));
      loadAnnouncements[announcement.location] = announcement;
      // io.to("announcements").emit("load-announcement", loadAnnouncements);
    });
  });
});
setInterval(() => {
  io.to("announcements").emit("weather-announcement", weatherAnnouncements);
  io.to("announcements").emit("load-announcement", loadAnnouncements);
  // console.log(
  //   new Date(),
  //   "weather-announcement",
  //   Object.keys(weatherAnnouncements).map(k => k)
  // );
  // saveWeatherStream.write(`${JSON.stringify(weatherAnnouncements)}\n`);
}, 1000);
