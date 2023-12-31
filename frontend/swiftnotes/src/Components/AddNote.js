// Components/AddNote.js
import React, { useContext, useState } from "react";
import noteContext from "../Context/Notes/noteContext";
import "./AddNote.css"; // Adjust the path based on your project structure
const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  // State for the form inputs
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    // Add more fields if needed
  });

  // Destructure values from note
  const { title, description, tag } = note; // Corrected the label for "tag"

  // Handle form input changes
  const handleChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any necessary actions with the form data
    // For example, you can add a new note to the state using the addNote function
    addNote(note.title, note.description, note.tag);

    // Clear the form after submission
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Note Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Note Tag {/* Corrected label for "tag" */}
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={tag}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Note Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
