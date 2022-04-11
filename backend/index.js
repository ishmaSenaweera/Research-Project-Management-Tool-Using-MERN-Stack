const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// set up server

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Successfully Server started on : ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

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

app.use("/login", require("./routers/login.router"));
app.use("/admin", require("./routers/admin.router"));
app.use("/student", require("./routers/student.router"));
