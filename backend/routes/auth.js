//routes/auth.js
const User = require("../models/User");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = new User(req.body);
    await user.save();
    res.send(req.body);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
