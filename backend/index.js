const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// set up server

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Successfully Server started on : ${PORT}`));

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

  app.use("/login", require("./routers/loginRouter"));
  app.use("/admin", require("./routers/adminRouter"));
  app.use("/student", require("./routers/studentRouter"));