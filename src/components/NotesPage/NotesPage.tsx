import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Note from "../Note/Note";
import AddNotesForm from "../AddNotesForm/AddNotesForm";

const NotesPage = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
    //-----------localStorage.getItem("notes") - Аргумент типа "string | null" нельзя назначить параметру типа "string".
    //-----------Тип "null" не может быть назначен для типа "string".
  );

  const addNote = (task: string, hashtags: string) => {
    if (task) {
      const newItem = {
        id: uuidv4(),
        task,
        hashtags,
      };

      setNotes([...notes, newItem]);
      localStorage.setItem("notes", JSON.stringify([...notes, newItem]));
    }
  };

  const editNote = (id: number, value: string, hashtags: string) => {
    const updatedNotes = notes.map((note) => {
      if (id === note.id) {
        return {
          id,
          task: value,
          hashtags,
        };
      }
      return note;
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const removeNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="notesPage">
      <h1 className="title">Notes List: {notes.length}</h1>
      <AddNotesForm addNote={addNote} />
      {/*  addNote  -- Тип "(task: string, hashtags: string) => void" не может быть назначен для типа "(value: string, hashtags: string[]) => void".
  Типы параметров "hashtags" и "hashtags" несовместимы.
    Тип "string[]" не может быть назначен для типа "string". */}
      {notes.map((note) => {
        return (
          <Note
            note={note}
            key={note.id}
            removeNote={removeNote}
            onChange={editNote}
            //     onChange --  Тип "(id: number, value: string, hashtags: string) => void" не может быть назначен для типа "(id: number, correctNote: string, hashtags: string[]) => void".
            // Типы параметров "hashtags" и "hashtags" несовместимы.
            //   Тип "string[]" не может быть назначен для типа "string".
          />
        );
      })}
    </div>
  );
};

export default NotesPage;
