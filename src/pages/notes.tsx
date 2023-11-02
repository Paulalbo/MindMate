import { useState } from "react";
import { format } from "date-fns";
import WysiwygEditor from "../component/Editor/Editor";
import "../component/Editor/style.css";

const Notes = () => {
  const currentNoteID = new URLSearchParams(window.location.search).get("note");

  // Get existing Notes
  let jsonData = localStorage.getItem("mindMateData");
  const storedNotes = jsonData ? JSON.parse(jsonData) : { notes: [] };
  const [notes, setNotes] = useState(storedNotes.notes);

  // Function to delete a note by ID
  const deleteNote = (noteID: string) => {
    // Remove the note with the given ID from the notes array
    const updatedNotes = notes.filter(
      (note: { id: string }) => note.id !== noteID
    );

    // Update the local storage data
    const updatedData = { notes: updatedNotes };
    localStorage.setItem("mindMateData", JSON.stringify(updatedData));

    // Update the notes state
    setNotes(updatedNotes);
  };

  function noteEditor(noteID: string | null) {
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
                <button
                  className="button"
                  onClick={() => {
                    deleteNote(note.id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Notes;
