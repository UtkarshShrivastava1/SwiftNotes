import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // Dummy notes for testing to be connected to the database
  const notesInitial = [
    // ... (your initial notes)
    {
      _id: "658d56951c179d1asdad8b65728d",
      user: "658d565e1c17c9d1d8b657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:05:57.944Z",
      __v: 0,
    },
    {
      _id: "658d56bd1c179d1add8b657294",
      user: "658d565e1ca179d1d8b657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:06:37.111Z",
      __v: 0,
    },
    {
      _id: "658d56bd1c179d1ddsa8b657294",
      user: "658d565e1c179d1d8jb657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:06:37.111Z",
      __v: 0,
    },
    {
      _id: "658d56bd1casd179d1d8b657294",
      user: "658d565e1c179drh1d8b657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:06:37.111Z",
      __v: 0,
    },
    {
      _id: "658d56bd1c179d1d8b6ds57294",
      user: "658d565e1c179hrtd1d8b657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:06:37.111Z",
      __v: 0,
    },
  ];

  // State to manage notes
  const [notes, setNotes] = useState(notesInitial);

  // Function to add a new note
  const addNote = (title, description, tag) => {
    // TODO: API Call
    console.log("Adding a new Note");
    const note = {
      _id: "658d56bd1c179d1d8b657294",
      user: "658d565e1c179d1gdr4d8b657288",
      title: title,
      description: description,
      tag: tag,
      date: "2023-12-28T11:06:37.111Z",
      __v: 0,
    };
    setNotes([...notes, note]); // Use the spread operator to create a new array
  };

  // Function to delete a note by ID
  const deleteNote = (noteId) => {
    console.log("deleting note with id: ");
    const updatedNotes = notes.filter((note) => note._id !== noteId);
    setNotes(updatedNotes);
  };

  // Function to edit a note
  const editNote = (editedNote) => {
    const updatedNotes = notes.map((note) =>
      note._id === editedNote._id ? editedNote : note
    );
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
