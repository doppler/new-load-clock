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
Object.keys(locations).map(location => {
  loadAnnouncements[location] = { location, loads: [] };
});

io.sockets.on("connection", socket => {
  socket.on("location", location => {
    console.log("join", location);
    socket.join(location);
    io.to(location).emit("load-announcement", loadAnnouncements[location]);
  });
  socket.on("weather-record", record => {
    console.log("weather-record", record.location, record.time);
    io.to(record.location).emit("weather", record);
  });
  socket.on("load-announcement", announcement => {
    console.log("loads", announcement.location, announcement.time);
    loadAnnouncements[announcement.location] = announcement;
    io.to(announcement.location).emit("load-announcement", announcement);
  });
});
