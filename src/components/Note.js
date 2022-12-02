import { useEffect, useRef, useState } from "react";
const Note = ({ note, toggleTask, removeNote }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [correctNote, setCorrectNote] = useState(note.task);
  //---------
  const [correctTags, setCorrectTags] = useState("");
  //----------
  const regexp = /#(.*?)[\s|#]/gi;

  const [tags, setTags] = useState(correctNote.match(regexp));
  const removeTag = () => {
    setTags([...tags.filter((tag, i) => tag[i] !== i)]); // !!не идет удаление тэга
  };

  const editTitleInputRef = useRef(null); // используется чтобы сделать фокус в конце предложения
  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

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
              <input
                className="tags"
                value={tag}
                onChange={(e) => setCorrectTags(e.target.value)} // !!!не редактируются тэги
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     tag = correctTags;
                //     setIsEditMode(false);
                //   }
                // }}
              ></input>
            ))}
          </>
        ) : (
          <>
            {note.task}
            <p>-------------------------</p>
            {tags?.map((tag) => (
              <>
                <p>{tag}</p>
                <button onClick={() => removeTag()}>del Tag</button>
              </>
            ))}
          </>
        )}
      </div>
      <div className="wrapperBtn">
        <button className="btnDelete" onClick={() => removeNote(note.id)}>
          delete
        </button>
        {/* <div
          className='btnActiveOrCompleted ml-5 cursor-pointer hover:scale-150 duration-200'
          onClick={() => toggleTask(todo.id)}
        >
          {todo.complete ? <BtnCompleted /> : <BtnActive />}
        </div> */}
        {isEditMode ? (
          <button
            className="btnEdited"
            onClick={() => {
              note.task = correctNote;
              setIsEditMode(false);
            }}
          >
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
