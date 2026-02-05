
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/activities", require("./routes/activities"));
app.use("/api/downloads", require("./routes/downloads"));

app.listen(3000, () => console.log("Server running on port 3000"));
