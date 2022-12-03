import React, { useState } from "react";
import Note from "../Note/Note";
import AddNotesForm from "../AddNotesForm/AddNotesForm";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random() * 10,
        task: userInput,
      };
      setNotes([...notes, newItem]);
    }
  };

  const onChangeTags = (id, data) => {
    const updateNotes = notes.map((note) => {
      if (id === note.id) {
        return { id, task: data };
      }
      return note;
    });
    setNotes(updateNotes);
  };

  const removeNote = (id) => {
    setNotes([...notes.filter((note) => note.id !== id)]);
  };

  // const handleToggle = (id) => {
  //   setTodos([
  //     ...todos.map((todo) =>
  //       todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }
  //     ),
  //   ]);
  // };

  //------------
  // -- подбор регулярки
  // let str = "qwe#Ere qef#125 erw#78#tty";
  // let regexp = /#(.*?)[\s|#]/gi;
  // const arr = str.match(regexp);
  // const q = arr.map((el) => el.slice(0, -1));
  // console.log(arr);
  // console.log("Топ хоп".match(/[тх]оп/gi));
  return (
    <div className="notesPage">
      <h1 className="title">Notes List: {notes.length}</h1>
      <AddNotesForm addNote={addNote} />
      {notes.map((note) => {
        return (
          <Note
            note={note}
            key={note.id}
            // toggleTask={handleToggle}
            removeNote={removeNote}
            onChange={onChangeTags}
          />
        );
      })}
    </div>
  );
};

export default NotesPage;
