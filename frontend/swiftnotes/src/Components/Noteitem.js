// Components/Noteitem.js
import React, { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";

const Noteitem = (props) => {
  const { title, description, tag, user, _id } = props.note; // Destructure _id
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { updateNote, handleClose } = props; // Add handleClose

  return (
    <div className="col-md-8 my-3">
      {/* Use Bootstrap grid system */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6>{tag}</h6>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <i
              className="fas fa-trash"
              onClick={() => {
                deleteNote(_id); // Use _id instead of note._id
              }}
            ></i>{" "}
            {/* Update with the correct class names */}
            {/* Font Awesome solid pen icon */}
            <i
              className="fas fa-pen-square"
              onClick={() => {
                updateNote(); // Call the updateNote function
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
