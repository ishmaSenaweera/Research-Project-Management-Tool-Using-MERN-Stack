const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const { Server } = require("socket.io");

dotenv.config();

// set up server

const app = express();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () =>
  console.log(`Successfully Server started on : ${PORT}`)
);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:1234"],
    credentials: true,
  })
);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:1234",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("send message" + data.room);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// connect to mongoDB

mongoose.connect(
  process.env.DBLINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully Connected to MongoDB");
  }
);

// set up routes

app.use("/auth", require("./routers/userManagement/login.router"));
app.use("/admin", require("./routers/userManagement/admin.router"));
app.use("/student", require("./routers/userManagement/student.router"));
app.use("/staff", require("./routers/userManagement/staff.router"));
app.use("/account", require("./routers/userManagement/user.router"));

app.use("/scheme", require("./routers/markingscheme/markingrouter"));

app.use("/groups", require("./routers/studentManagement/createGroup.router"));

app.use("/templates", express.static(path.join(__dirname, "templates")));
