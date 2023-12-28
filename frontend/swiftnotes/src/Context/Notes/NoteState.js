// Context/Notes/NoteState.js
import React, { useState } from "react";
import NoteContext from "./noteContext"; // Fix the import statement

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "658d56951c179d1d8b65728d",
      user: "658d565e1c179d1d8b657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:05:57.944Z",
      __v: 0,
    },
    {
      _id: "658d56bd1c179d1d8b657294",
      user: "658d565e1c179d1d8b657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:06:37.111Z",
      __v: 0,
    },
    {
      _id: "658d56bd1c179d1d8b657294",
      user: "658d565e1c179d1d8b657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:06:37.111Z",
      __v: 0,
    },
    {
      _id: "658d56bd1c179d1d8b657294",
      user: "658d565e1c179d1d8b657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:06:37.111Z",
      __v: 0,
    },
    {
      _id: "658d56bd1c179d1d8b657294",
      user: "658d565e1c179d1d8b657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:06:37.111Z",
      __v: 0,
    },
    {
      _id: "658d56bd1c179d1d8b657294",
      user: "658d565e1c179d1d8b657288",
      title: "Regarding Lois",
      description: "Joker got her",
      tag: "lois",
      date: "2023-12-28T11:06:37.111Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
