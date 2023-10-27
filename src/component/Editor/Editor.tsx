import "./style.css";
import { ReactNode, useState } from "react";
import { Editor, EditorState, RichUtils, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import htmlToDraft from "html-to-draftjs";
import { format } from "date-fns";

import "draft-js/dist/Draft.css";

const customStyleMap = {
  H1: {
    fontSize: "30px",
    fontWeight: "900",
    background: "#fafafa",
    padding: "10px 15px",
    width: "100%",
    display: "block",
  },
  H2: {
    fontSize: "25px",
    fontWeight: "700",
  },
  H3: {
    fontSize: "20px",
    fontWeight: "500",
  },
};

function WysiwygEditor() {
  // create editor with existing content
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalEditorContent, setModalEditorContent] = useState(
    EditorState.createEmpty()
  );

  // Add custom styling buttons

  const toggleBold = () => {
    setModalEditorContent(
      RichUtils.toggleInlineStyle(modalEditorContent, "BOLD")
    );
  };
  const toggleItalic = () => {
    setModalEditorContent(
      RichUtils.toggleInlineStyle(modalEditorContent, "ITALIC")
    );
  };
  const toggleHeading1 = () => {
    setModalEditorContent(
      RichUtils.toggleBlockType(modalEditorContent, "header-one")
    );
  };
  const toggleHeading2 = () => {
    setModalEditorContent(
      RichUtils.toggleBlockType(modalEditorContent, "header-two")
    );
  };
  const toggleHeading3 = () => {
    setModalEditorContent(
      RichUtils.toggleBlockType(modalEditorContent, "header-three")
    );
  };

  // Get existing Tasks
  let jsonData = localStorage.getItem("mindMateData");
  const storedNotes = jsonData ? JSON.parse(jsonData) : { tasks: [] };
  const [notes] = useState(storedNotes.notes);

  // Export to PDF
  // coming soon

  // Save Note and add to json data
  const publishNote = () => {
    // Get the current editor content
    const contentState = modalEditorContent.getCurrentContent();
    const contentText = stateToHTML(contentState);

    // Get the title from the input field
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const title = titleInput.value;

    // Retrieve existing data from local storage or initialize it if not present
    const localStorageData = localStorage.getItem("mindMateData");
    let existingData = localStorageData ? JSON.parse(localStorageData) : {};

    if (!existingData.notes) {
      existingData.notes = [];
    }

    // Create a new note object
    const newNote = {
      id: String(Date.now()),
      title,
      content: contentText,
      date: new Date().toISOString(), // Store the creation date
    };

    // Add the new note to the notes array
    existingData.notes.push(newNote);

    // Update the local storage with the updated data
    localStorage.setItem("mindMateData", JSON.stringify(existingData));

    console.log("Note saved:", newNote);
  };

  const saveNote = () => {
    console.log("save shit");
  };

  function convertHTMLToContentState(htmlContent: string) {
    const blocksFromHTML = htmlToDraft(htmlContent);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return contentState;
  }

  const openModal = (contentEditor: string) => {
    const contentState = convertHTMLToContentState(contentEditor);
    setModalEditorContent(EditorState.createWithContent(contentState));
    setModalOpen(true);
  };
  const openModalNew = () => {
    setModalEditorContent(EditorState.createEmpty());
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // refresh page after save
    window.location.reload();
  };

  return (
    <>
      <div className="notes">
        <div className="notes__document notes__document--new">
          <button className="button" onClick={() => openModalNew()}>
            +
          </button>
        </div>
        {notes.map(
          (note: {
            id: string;
            content: string;
            title: ReactNode;
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
                <button
                  className="button"
                  onClick={() => openModal(note.content)}
                >
                  open
                </button>
                <button className="button">delete</button>
              </div>
            </div>
          )
        )}
      </div>

      {isModalOpen && (
        <div className="notes__modalcontainer">
          <div className="notes__modal">
            <div className="style-controls">
              <button className="button" onClick={toggleBold}>
                Bold
              </button>
              <button className="button" onClick={toggleItalic}>
                Italic
              </button>
              <button className="button" onClick={toggleHeading1}>
                H1
              </button>
              <button className="button" onClick={toggleHeading2}>
                H2
              </button>
              <button
                style={{ marginRight: "auto" }}
                className="button"
                onClick={toggleHeading3}
              >
                H3
              </button>
              {/* <button className="button">
                Export to PDF
              </button>*/}
              {/* Conditional rendering for Publish or Save button */}
              {notes.length === 0 ? ( // Check if the notes array is empty
                // If there are no notes, display the "Publish" button
                <button className="button" onClick={publishNote}>
                  Publish
                </button>
              ) : (
                // If there are notes, display the "Save" button
                <button className="button" onClick={saveNote}>
                  Save
                </button>
              )}
              <button className="button" onClick={closeModal}>
                X
              </button>
            </div>
            <div className="editor__title">
              <label>Title:</label>
              <input id="title" type="input"></input>
            </div>
            <Editor
              editorState={modalEditorContent}
              onChange={setModalEditorContent}
              customStyleMap={customStyleMap}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default WysiwygEditor;
