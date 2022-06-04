const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const { Server } = require("socket.io");

/* Loading the environment variables from the .env file. */
dotenv.config();

//
// ─── SET UP SERVER ──────────────────────────────────────────────────────────────
//

/* Creating an instance of express. */
const app = express();

/* Setting the port to 8000. */
const PORT = process.env.PORT || 8000;

/* Starting the server on the port 8000. */
const server = app.listen(PORT, () =>
  console.log(`Successfully Server started on : ${PORT}`)
);

/* A middleware that parses the body of the request and makes it available in the req.body property. */
app.use(express.json());
/* Parsing the cookie and making it available in the req.cookies property. */
app.use(cookieParser());
/* Allowing the server to accept requests from the client. */
app.use(
  cors({
    origin: ["http://localhost:1234"],
    credentials: true,
  })
);

//
// ─── CHAT MANGEMENT ─────────────────────────────────────────────────────────────
//

/* Creating a new server instance. */
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:1234",
    // credentials: true,
  },
});

/* This is the code for the chat server. */
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  /* Joining the room. */
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  /* Sending the message to the room. */
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  /* Logging the user disconnection. */
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

//
// ─── CONNECT TO MONGODB ─────────────────────────────────────────────────────────
//

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

//
// ─── SET UP ROUTES ──────────────────────────────────────────────────────────────
//

//User management routes
app.use("/auth", require("./routers/userManagement/login.router"));
app.use("/admin", require("./routers/userManagement/admin.router"));
app.use("/student", require("./routers/userManagement/student.router"));
app.use("/staff", require("./routers/userManagement/staff.router"));
app.use("/account", require("./routers/userManagement/user.router"));
app.use("/chat", require("./routers/chatManagement/chat.router"));

// ────────────────────────────────────────────────────────────────────────────────

app.use("/scheme", require("./routers/markingscheme/markingrouter"));

// ────────────────────────────────────────────────────────────────────────────────

// group routers
app.use("/groups", require("./routers/groupManagement/createGroup.router"));

// ────────────────────────────────────────────────────────────────────────────────

// template files routers
app.use("/templates", express.static(path.join(__dirname, "templates")));
app.use("/api", require("./routers/projectManagement/fileUpload.router"));

// ────────────────────────────────────────────────────────────────────────────────

// research topic routers
app.use(
  "/research-topic",
  require("./routers/projectManagement/researchTopic.router")
);
