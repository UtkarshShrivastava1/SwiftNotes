// Components/Notes.js
import React, { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, addNote } = context;
  return (
    <>
      <AddNote />
      <div className="container my-3">
        <h2>Your Notes</h2>
        <div className="row">
          {context.notes.map((note, index) => (
            <div key={note._id} className="col-md-4">
              <Noteitem note={note} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
