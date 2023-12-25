// middleware/fetchuser.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = "5a8f621a5e8c2b035e8d9d8c2c4fda6c";

const fetchuser = async (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: "Please authenticate" });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Fetch the user details from the database
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the user details to the req object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    console.error("Error decoding token:", error);
    return res
      .status(401)
      .json({ error: "Invalid token", detail: error.message });
  }
};

module.exports = fetchuser;
