const express = require("express");
const app = express();
const server = require("http").Server(app);
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
  loadAnnouncements[location] = { location, loads: [] };
  weatherAnnouncements[location] = { location, weather: {} };
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
  socket.on("weather-record", record => {
    console.log(new Date(), "weather-record", record.location);
    weatherAnnouncements[record.location] = record;
  });
  socket.on("load-announcement", announcement => {
    console.log(new Date(), "load-announcement", announcement.location);
    loadAnnouncements[announcement.location] = announcement;
    io.to("announcements").emit("load-announcement", announcement);
  });
});
setInterval(() => {
  io.to("announcements").emit("weather-announcement", weatherAnnouncements);
  console.log(
    new Date(),
    "weather-announcement",
    Object.keys(weatherAnnouncements).map(k => k)
  );
}, 2000);
