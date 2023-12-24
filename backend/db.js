// db.js
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/SwiftNotesDB"; // Replace 'your-database-name' with your actual database name

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectToMongo;
