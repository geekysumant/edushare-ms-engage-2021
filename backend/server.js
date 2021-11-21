require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

//database connection
const db = require("./config/mongoose");

app.use(express.json());

app.use("/", require("./routes"));

const users = {};

const socketToRoom = {};
io.on("connection", (socket) => {
  socket.on("join room", ({ roomID, userName }) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push({ userID: socket.id, userName });
    } else {
      users[roomID] = [{ userID: socket.id, userName }];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(
      ({ userID, userName }) => userID !== socket.id
    );
    console.log(usersInThisRoom);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
      userName: payload.userName,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });
  socket.on("pre_disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
      const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);
      // socket.emit("all users", usersInThisRoom);
    }
    socket.broadcast.emit("disconnect successful", socket.id);
  });
  socket.on("disconnect", () => {
    // socket.broadcast.emit("disconnect successful", socket.id);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}
const PORT = process.env.PORT || 8080;
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server up & running!");
  // console.log(require("dotenv").config());
});
