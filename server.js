require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const jwt = require("jsonwebtoken");
const io = require("socket.io")(server);
const path = require("path");
const locations = require("./src/locations.json");

const PORT = process.env.PORT || 5000;

server.listen(PORT);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const loadAnnouncements = {};
const weatherAnnouncements = {};
Object.keys(locations).map(location => {
  loadAnnouncements[location] = [];
  weatherAnnouncements[location] = {};
});

io.sockets.on("connection", socket => {
  socket.on("join", channel => {
    console.log("join", channel);
    socket.leaveAll();
    socket.join(channel);
    if (channel === "announcements") {
      io.to("announcements").emit("load-announcement", loadAnnouncements);
      io.to("announcements").emit("weather-announcement", weatherAnnouncements);
    }
  });

  socket.on("jwt-weather-record", token => {
    jwt.verify(token, process.env.JWT_SECRET, (err, record) => {
      if (err) {
        console.log(err.message);
        return false;
      }
      console.log("jwt-weather-record", record.location, record.time);
      weatherAnnouncements[record.location] = record;
      // io.to(record.location).emit("weather", record);
    });
  });
  // socket.on("weather-record", record => {
  //   console.log("weather-record", record.location, record.time);
  //   io.to(record.location).emit("weather", record);
  // });
  socket.on("jwt-load-announcement", token => {
    jwt.verify(token, process.env.JWT_SECRET, (err, announcement) => {
      if (err) {
        console.log(err.message);
        return false;
      }
      console.log(
        "jwt-load-announcment",
        announcement.location,
        announcement.time
      );
      loadAnnouncements[announcement.location] = announcement.loads;
      io.to("announcements").emit("load-announcement", loadAnnouncements);
    });
  });
  // socket.on("load-announcement", announcement => {
  //   console.log("loads", announcement.location, announcement.time);
  //   loadAnnouncements[announcement.location] = announcement;
  //   io.to(announcement.location).emit("load-announcement", announcement);
  // });
});
setInterval(() => {
  io.to("announcements").emit("weather-announcement", weatherAnnouncements);
  console.log(
    new Date(),
    "weather-announcement",
    Object.keys(weatherAnnouncements).map(k => k)
  );
}, 2000);
