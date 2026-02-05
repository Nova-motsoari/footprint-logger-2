const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  label: String,
  category: String,
  co2: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", ActivitySchema);
