// Context/Notes/NoteState.js
import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";

  // Dummy notes for testing to be connected to the database
  const notesInitial = [];

  // State to manage notes
  const [notes, setNotes] = useState(notesInitial);
  // State to manage user information
  const [user, setUser] = useState(null);
  // Function to Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Function to add a new note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log("Adding a new Note:", json);

      // Update state with the new note
      setNotes([...notes, json]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Function to delete a note by ID
  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      // Update state after deletion
      if (response.ok) {
        const updatedNotes = notes.filter((note) => note._id !== noteId);
        setNotes(updatedNotes);
      } else {
        console.error("Error deleting note:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Function to edit a note
  // Function to edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      // Update state after editing
      //const json = await response.json(); // Move this line here
      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === id ? { ...note, title, description, tag } : note
          )
        );
      } else {
        console.error("Error editing note:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };
  // Function to set the user when logged in
  const loginUser = (userData) => {
    setUser(userData);
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        loginUser,
        user,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
