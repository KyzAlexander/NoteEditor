import React from "react";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";

import Tooltip from "@mui/material/Tooltip";

import { hashtagRegexp } from "../../helpers/constants";
import { INoteProps } from "./interfaces";

const Note: React.FC<INoteProps> = ({ note, removeNote, onChange }) => {
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [correctNote, setCorrectNote] = useState(note.task);

  useEffect(() => {
    setCorrectNote(note.task);
  }, [note.task]);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  const onSave = () => {
    const hashtags = correctNote.match(hashtagRegexp) || [];

    onChange(note.id, correctNote, hashtags, note.date);
    setIsEditMode(false);
  };

  const onDeleteHashtag = (tagToRemove: string) => {
    const udpatedNote = note.task.replace(tagToRemove, "");
    const updatedHashtags = note.hashtags.filter(
      (hashtag: string) => hashtag !== tagToRemove
    );

    onChange(note.id, udpatedNote, updatedHashtags, note.date);
  };

  const renderHashtags = () => {
    return note.hashtags.map((hashtag: string) => {
      return (
        <div className="tag">
          <p className="title">{hashtag}</p>
          <ClearIcon
            onClick={() => onDeleteHashtag(hashtag)}
            sx={{ color: "#00ff89", cursor: "pointer" }}
            fontSize="small"
          />
        </div>
      );
    });
  };

  return (
    <div key={note.id} className="itemNote">
      <div className="wrapperNote">
        <span className="currentDate">{note.date}</span>
        {isEditMode ? (
          <div className="wrapperEditNote">
            <input
              className="editNote"
              value={correctNote}
              ref={editTitleInputRef}
              onChange={(e) => setCorrectNote(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSave();
                }
              }}
            />
          </div>
        ) : (
          <div className="noteAndTags">
            <p className="noteAndTags__note">{note.task}</p>
            <div className="noteAndTags__tags">{renderHashtags()}</div>
          </div>
        )}
      </div>
      <div className="wrapperBtn">
        <DeleteIcon
          className="wrapperBtn__btnDelete"
          onClick={() => removeNote(note.id)}
          sx={{ color: "#00ff89", cursor: "pointer" }}
        />
        {isEditMode ? (
          <CheckCircleIcon
            className="wrapperBtn__btnConfirm"
            onClick={onSave}
            sx={{ color: "#00ff89", cursor: "pointer", ml: "5px" }}
          />
        ) : (
          <Tooltip
            title="To add a tag, put a space and start writing with the symbol # (#tag)"
            placement="right-start"
          >
            <CreateIcon
              className="wrapperBtn__BtnEdit"
              onClick={() => setIsEditMode(true)}
              sx={{ color: "#00ff89", cursor: "pointer", ml: "5px" }}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Note;
