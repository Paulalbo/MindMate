import { Key, useState } from "react";
import { format } from "date-fns";
import WysiwygEditor from "../component/Editor/Editor";
import "../component/Editor/style.css";

const Notes = () => {
  const currentNoteID = new URLSearchParams(window.location.search).get("note");

  // Get existing data from local storage
  let jsonData = localStorage.getItem("mindMateData");
  const storedData = jsonData ? JSON.parse(jsonData) : { notes: [], tasks: [] };
  const [data, setData] = useState(storedData);

  // Function to delete a note by ID
  const deleteNote = (noteID: any) => {
    // Find the index of the note to be deleted
    const noteIndex = data.notes.findIndex(
      (note: { id: any }) => note.id === noteID
    );

    // If the note was found, remove it from the array
    if (noteIndex !== -1) {
      const updatedNotes = [...data.notes];
      updatedNotes.splice(noteIndex, 1);

      // Create a new data object with updated notes array
      const updatedData = { ...data, notes: updatedNotes };

      // Update the local storage data and the state
      localStorage.setItem("mindMateData", JSON.stringify(updatedData));
      setData(updatedData);
    }
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
        {data.notes.map(
          (note: {
            id: Key | null | undefined;
            date: string | number | Date;
            title: string;
            content: any;
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
