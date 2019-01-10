const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(3001);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
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
