import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Note from "../Note/Note";
import AddNotesForm from "../AddNotesForm/AddNotesForm";

const NotesPage = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes") as string) || []
  );

  type Note = {
    id: number;
    task: string;
    hashtags: Array<string>;
  };

  const addNote = (task: string, hashtags: Array<string>) => {
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

  const editNote = (id: number, value: string, hashtags: Array<string>) => {
    const updatedNotes = notes.map((note: Note) => {
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
    const updatedNotes = notes.filter((note: Note) => note.id !== id);

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const onChangeFilter = (id: number) => {
    if (id === 0) {
      return notes;
    } else {
      const updatedNotes = notes.filter((note: Note) => note.id === id);
      return updatedNotes;
      // setNotes(updatedNotes);
      // localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  console.log(notes);
  return (
    <div className="notesPage">
      <select onChange={(e) => onChangeFilter(e.target.value)}>
        <option value={0}>all</option>
        {notes.map((note: Note) => {
          if (note.hashtags.length !== 0) {
            return <option value={note.id}>{note.hashtags}</option>;
          } else return null;
        })}
      </select>

      <h1 className="title">Notes List: {notes.length}</h1>
      <AddNotesForm addNote={addNote} />
      {notes.map((note: Note) => {
        return (
          <Note
            note={note}
            key={note.id}
            removeNote={removeNote}
            onChange={editNote}
          />
        );
      })}
    </div>
  );
};

export default NotesPage;
