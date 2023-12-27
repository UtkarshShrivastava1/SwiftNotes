// Context/Notes/NoteState.js
import React from "react";
import NoteContext from "./noteContext"; // Fix the import statement

const NoteState = (props) => {
  return (
    <NoteContext.Provider value={{}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
