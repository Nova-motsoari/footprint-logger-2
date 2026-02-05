require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/activities", require("./routes/activities"));

console.log("ENV TEST:", process.env.MONGO_URI);

app.listen(5000, () => console.log("Server running on port 5000"));
