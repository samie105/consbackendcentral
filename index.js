const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 1200;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Admin = require("./models/admin");

// const uri = 'mongodb+srv://amirizew:dodo1111@cluster0.nib2hkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const uri =
  "mongodb+srv://richfield:richfield12@mycluster.uzw30gm.mongodb.net/";

//database  connection
mongoose.connect(uri).then(() => {
  console.log("connected successfully");
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Routes
const packageRoute = require("./routes/thePackageRoute");
// const authenticationRoute = require("./routes/authroute")
// const dashboardRoute = require("./routes/dashboard")

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  // req.header("Content-Type: application/x-www-form-urlencoded");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );

  next();
});

app.get("/", (req, res) => {
  res.json({ message: "I work" });
});

app.post("/admin-change-password", async (req, res) => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/create-admin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    // const admin = await Admin.findOne({ username });
    // console.log(admin);
    // if (!admin) {
    //     return res.status(400).json({ message: 'Admin not found' });
    // }

    // const isMatch = admin.password === password;
    // console.log(isMatch);
    // if (!isMatch) {
    //     return res.status(400).json({ message: 'Password is incorrect' });
    // }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.use("/package", packageRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
