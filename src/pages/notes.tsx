import { useState } from "react";
import { format } from "date-fns";
import WysiwygEditor from "../component/Editor/Editor";
import "../component/Editor/style.css";

const Notes = () => {
  const currentNoteID = new URLSearchParams(window.location.search).get("note");

  // Get existing Tasks
  let jsonData = localStorage.getItem("mindMateData");
  const storedNotes = jsonData ? JSON.parse(jsonData) : { tasks: [] };
  const [notes] = useState(storedNotes.notes);

  function noteEditor(noteID: any) {
    if (noteID) {
      return <WysiwygEditor selectNote={noteID} />;
    }
    return;
  }

  return (
    <div>
      <h1>Your Notes</h1>
      {noteEditor(currentNoteID)}
      <div className="notes">
        <div className="notes__document notes__document--new">
          <a
            className="button"
            onClick={() => {
              window.location.href = "?note=newNote";
            }}
          >
            +
          </a>
        </div>
        {notes.map(
          (note: {
            id: string;
            content: string;
            title: string;
            date: string;
          }) => (
            <div className="notes__document" key={note.id}>
              <p className="notes__date">
                {format(new Date(note.date), "dd. MMM. yyyy")}
              </p>
              <p className="notes__title">{note.title}</p>
              <div
                className="notes__content"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
              <div className="notes__controls">
                <a
                  className="button"
                  onClick={() => {
                    window.location.href = `?note=${note.id}`;
                  }}
                >
                  open
                </a>
                <button className="button">delete</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Notes;
