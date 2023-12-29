// Components/Notes.js
import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import noteContext from "../Context/Notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    getNotes();
  }, []);

  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const ref = useRef(null);

  const updateNote = (note) => {
    setSelectedNote(note);
    setShowModal(true);

    // Set the initial form data to the values of the selected note
    setFormData({
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedNote(null);
  };

  const handleSaveChanges = () => {
    if (selectedNote) {
      const updatedTitle = formData.title;
      const updatedDescription = formData.description;
      const updatedTag = formData.tag;

      // Call the editNote function to update the note
      editNote(selectedNote._id, updatedTitle, updatedDescription, updatedTag);

      // Close the modal after saving changes
      handleClose();
    }
  };

  // Update the form data when the user types in the form fields
  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  return (
    <>
      <AddNote />
      {/* Button trigger modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        onClick={() => updateNote()}
        style={{ display: "none" }} // Set display: none to make the button invisible
      ></button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Add form fields for editing note details */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                // Set the default value to the existing title
                defaultValue={formData.title}
                // Add an onChange handler to track changes in real-time
                onChange={(e) => handleInputChange(e, "title")}
              />
            </Form.Group>

            <Form.Group controlId="formTag">
              <Form.Label>tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tag"
                // Set the default value to the existing title
                defaultValue={formData.tag}
                // Add an onChange handler to track changes in real-time
                onChange={(e) => handleInputChange(e, "tag")}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                // Set the default value to the existing description
                defaultValue={formData.description}
                // Add an onChange handler to track changes in real-time
                onChange={(e) => handleInputChange(e, "description")}
              />
            </Form.Group>
            {/* Add more form fields if needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container my-3">
        <h2>Your Notes</h2>
        <div className="row">
          {context.notes.map((note, index) => (
            <div key={note._id} className="col-md-4">
              <Noteitem
                note={note}
                updateNote={() => updateNote(note)}
                handleClose={handleClose}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
