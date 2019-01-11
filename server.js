const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");

const PORT = process.env.PORT || 5000;

server.listen(PORT);

app.use(express.static(path.join(__dirname, "build")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

io.sockets.on("connection", socket => {
  socket.on("location", location => {
    console.log("join", location);
    socket.join(location);
  });
  socket.on("weather-record", record => {
    io.to(record.location).emit("weather", record);
  });
});
