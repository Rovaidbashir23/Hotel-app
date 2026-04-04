require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { poolPromise } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const guestRoutes = require("./routes/guestRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/guest", guestRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hotel App Backend is Running!" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
