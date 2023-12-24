const User = require("../models/User");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
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
      console.log(req.body);

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

      // Use User.create for a more concise code
      const newUser = await User.create(req.body);

      // Send the entire user object in the response
      res.json(newUser.toObject());
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
