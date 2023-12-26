// routes/notes.js
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
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

// ROUTE 03: Update an existing Note using: PUT "/api/notes/updatenote/:id" [LOGIN REQUIRED]
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Creating a new object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find Note to be updated and then update it using findByIdAndUpdate()
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ROUTE 04: Delete an existing Note using: DELETE "/api/notes/deletenote/:id" [LOGIN REQUIRED]
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find Note to be deleted and then delete it using findByIdAndDelete()
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion if logged-in user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ note });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
