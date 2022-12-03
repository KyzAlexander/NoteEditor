import { useEffect, useRef, useState } from "react";
const Note = ({ note, toggleTask, removeNote, onChange }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [correctNote, setCorrectNote] = useState(note.task);
  //---------
  // const [correctTags, setCorrectTags] = useState("");
  //----------
  const regexp = /\B(#[a-zA-Z0-9]+\b)(?!;)/gi;

  const [tags, setTags] = useState(note.task.match(regexp));
  const removeTag = (tagToRemove) => {
    setTags([...tags.filter((tag) => tag !== tagToRemove)]);
  };

  const editTitleInputRef = useRef(null); // используется чтобы сделать фокус в конце предложения
  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  const onSave = () => {
    onChange(note.id, correctNote);
    setIsEditMode(false);
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
            ></input>
            {tags?.map((tag) => (
              <p
                className="tags"
                // onChange={(e) => setCorrectTags(e.target.value)} // !!!не редактируются тэги
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     tag = correctTags;
                //     setIsEditMode(false);
                //   }
                // }}
              >
                {tag}
              </p>
            ))}
          </>
        ) : (
          <>
            {note.task}
            <p>-------------------------</p>
            {tags?.map((tag) => (
              <>
                <p>{tag}</p>
                <button onClick={() => removeTag(tag)}>del Tag</button>
              </>
            ))}
          </>
        )}
      </div>
      <div className="wrapperBtn">
        <button className="btnDelete" onClick={() => removeNote(note.id)}>
          delete
        </button>
        {isEditMode ? (
          <button className="btnEdited" onClick={onSave}>
            отредакторованно
          </button>
        ) : (
          <button className="BtnEdit" onClick={() => setIsEditMode(true)}>
            редактировать
          </button>
        )}
      </div>
    </div>
  );
};

export default Note;
