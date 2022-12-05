import React from "react";
import { useEffect, useRef, useState } from "react";

import { hashtagRegexp } from "../../helpers/constants";
import { INoteProps } from "./interfaces";

const Note: React.FC<INoteProps> = ({ note, removeNote, onChange }) => {
  const editTitleInputRef = useRef(null); // используется чтобы сделать фокус в конце предложения

  const [isEditMode, setIsEditMode] = useState(false);
  const [correctNote, setCorrectNote] = useState(note.task);

  useEffect(() => {
    setCorrectNote(note.task);
  }, [note.task]);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus(); //Свойство "focus" не существует в типе "never"
    }
  }, [isEditMode]);

  const onSave = () => {
    const hashtags = correctNote.match(hashtagRegexp) || [];

    onChange(note.id, correctNote, hashtags);
    setIsEditMode(false);
  };

  const onDeleteHashtag = (tagToRemove: string) => {
    const udpatedNote = note.task.replace(tagToRemove, "");
    const updatedHashtags = note.hashtags.filter(
      //------------------------------------------Свойство "filter" не существует в типе "string".
      (hashtag: string) => hashtag !== tagToRemove
    );

    onChange(note.id, udpatedNote, updatedHashtags);
  };

  const renderHashtags = () => {
    return note.hashtags.map((hashtag: string) => {
      //--------------------------------------------Свойство "map" не существует в типе "string"
      return (
        <div className="tag">
          <p>{hashtag}</p>
          <button onClick={() => onDeleteHashtag(hashtag)}>del Tag</button>
        </div>
      );
    });
  };

  return (
    <div key={note.id} className="itemNote">
      <div>
        {isEditMode ? (
          <>
            <input
              className="editNote"
              value={correctNote}
              ref={editTitleInputRef}
              onChange={(e) => setCorrectNote(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  note.task = correctNote;
                  setIsEditMode(false);
                }
              }}
            />
          </>
        ) : (
          <>
            {note.task}
            <p>-------------------------</p>
            {renderHashtags()}
          </>
        )}
      </div>
      <div className="wrapperBtn">
        <button className="btnDelete" onClick={() => removeNote(note.id)}>
          delete
        </button>
        {isEditMode ? (
          <button className="btnEdited" onClick={onSave}>
            confirm
          </button>
        ) : (
          <button className="BtnEdit" onClick={() => setIsEditMode(true)}>
            edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Note;
