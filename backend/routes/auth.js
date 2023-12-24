const User = require("../models/User");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    // Add more validation rules as needed
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
      const token = jwt.sign({ userId: newUser._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      // Send only the token in the response
      res.json({ token });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
