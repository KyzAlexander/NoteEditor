import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Note from "../Note/Note";
import AddNotesForm from "../AddNotesForm/AddNotesForm";

const NotesPage = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes") as string) || []
  );
  const [selectedFilter, setSelectedFilter] = useState("all");

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

  const onChangeFilter = (hashtag: string) => {
    setSelectedFilter(hashtag);
  };

  const renderFilterOptions = () => {
    const availableFilters: any = new Set([]);
    notes.forEach((note: Note) => {
      note.hashtags.forEach((hashtag) => {
        availableFilters.add(hashtag);
      });
    });

    return Array.from(availableFilters).map((filter: any) => (
      <option value={filter}>{filter}</option>
    ));
  };

  return (
    <div className="notesPage">
      <h1 className="title">Notes List: {notes.length}</h1>
      <AddNotesForm addNote={addNote} />
      <select
        className="filterTags"
        onChange={(e) => onChangeFilter(e.target.value)}
      >
        <option value={"all"}>all</option>
        {renderFilterOptions()}
      </select>
      {notes
        .filter(
          (note: Note) =>
            selectedFilter === "all" || note.hashtags.includes(selectedFilter)
        )
        .map((note: Note) => {
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
