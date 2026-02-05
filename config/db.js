const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("MONGO_URI:", process.env.MONGO_URI); // DEBUG LINE

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

module.exports = connectDB;
