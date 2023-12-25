// routes/notes.js
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note"); // Assuming your model is named "Note" instead of "Notes"
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

// ROUTE 01: Get All Notes using: GET "/api/notes/fetchallnotes" [LOGIN REQUIRED]
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE 02: Add Notes using: POST "/api/notes/addnotes" [LOGIN REQUIRED]
router.post(
  "/addnotes",
  fetchuser,
  [
    // Validate title
    body("title").trim().isLength({ min: 3 }).withMessage("Title is required"),

    // Validate description
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),

    // You can add more validation rules for the 'tag' field if needed
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error("Error adding note:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
