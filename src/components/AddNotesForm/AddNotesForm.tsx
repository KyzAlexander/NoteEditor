import React from "react";
import { useState } from "react";

import { hashtagRegexp } from "../../helpers/constants";
import { IAddNotesFormProps } from "./interfaces";

const AddNotesForm: React.FC<IAddNotesFormProps> = ({ addNote }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //отмена действия браузера

    const hashtags = value.match(hashtagRegexp) || [];
    addNote(value, hashtags);
    setValue("");
  };

  const handleKeyPress = (e: any) => {
    // обрабатывает нажатие на Enter
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <form className="addNotesForm" onSubmit={handleSubmit}>
      <input
        className="noteAdd"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter a task ..."
      ></input>
      <button className="btnSave">Save</button>
    </form>
  );
};

export default AddNotesForm;
