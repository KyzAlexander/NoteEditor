import { useState } from "react";

const AddNotesForm = ({ addNote }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //отмена действия браузера
    addNote(userInput);
    setUserInput("");
  };

  const handleKeyPress = (e) => {
    // обрабатывает нажатие на Enter
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <form className="addNotesForm" onSubmit={handleSubmit}>
      <input
        className="noteAdd"
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter a task ..."
      ></input>
      <button className="btnSave">Save</button>
    </form>
  );
};

export default AddNotesForm;
