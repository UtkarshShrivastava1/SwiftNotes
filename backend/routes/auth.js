// routes/auth.js
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");

// Use a constant for JWT secret key
const JWT_SECRET = "5a8f621a5e8c2b035e8d9d8c2c4fda6c";

// ROUTE 01: Create a user using: POST "/api/auth/createuser" [NO LOGIN REQUIRED]
router.post(
  "/createuser",
  [
    // Validate name
    body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),

    // Validate email
    body("email").isEmail().withMessage("Invalid email"),

    // Validate password
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if the email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash the password before saving it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user with the hashed password
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      // Create a JWT token
      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
        expiresIn: "24h",
      });
      const success = true;
      // Send only the token in the response
      res.json({ success, token });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 02: Authenticate a user using: POST "/api/auth/login" [NO LOGIN REQUIRED]
router.post(
  "/login",
  [
    // Validate email
    body("email").isEmail().withMessage("Invalid email"),

    // Validate password
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long")
      .exists(),
  ],
  async (req, res) => {
    let success = false;

    // If there are errors, return bad request and the error
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        success = false;

        return res
          .status(400)
          .json({ error: "Please enter correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ error: "Invalid password" });
      }

      // Use the same structure for the token payload
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "24h",
      });
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 03: Get Loggedin user details using: POST "/api/auth/getuser" [LOGIN REQUIRED]
router.post("/getuser", fetchuser, async (req, res) => {
  let user; // Move the declaration outside the try block
  try {
    // The user information is already attached to the req object by the fetchuser middleware
    user = req.user; // Assign the value here
    const success = true;
    res.json({ success, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
