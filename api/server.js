const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const r = require("rethinkdb");

server.listen(3001);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

r.connect()
  .then(conn => {
    r.table("weatherStationData")
      .filter({ location: "ATL", type: "weather" })
      .changes()
      .run(conn, (err, cursor) => {
        if (err) throw err;
        cursor.each((err, result) => {
          io.emit("weather", result.new_val);
        });
      });
  })
  .catch(error => console.log(error));
