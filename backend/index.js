const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var schemeRoutes = require("./routers/markingscheme/markingrouter");

dotenv.config();

// set up server

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Successfully Server started on : ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:1234"],
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

app.use("/auth", require("./routers/userManagement/login.router"));
app.use("/admin", require("./routers/userManagement/admin.router"));
app.use("/student", require("./routers/userManagement/student.router"));
app.use("/staff", require("./routers/userManagement/staff.router"));
app.use("/account", require("./routers/userManagement/user.router"));
app.use("/scheme", schemeRoutes);
