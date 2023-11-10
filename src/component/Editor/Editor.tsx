import "./style.css";
import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import htmlToDraft from "html-to-draftjs";
import "draft-js/dist/Draft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faHighlighter,
} from "@fortawesome/free-solid-svg-icons";
import MailButton from "../Mail/Mail";

interface WysiwygEditorProps {
  selectNote: string;
}
const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
  HIGHLIGHT: {
    backgroundColor: "#FFFF00",
  },
};

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ selectNote }) => {
  const [isModalOpen, setModalOpen] = useState(true);
  const pattern = /^\d{13}$/;
  const [modalEditorContent, setModalEditorContent] = useState(
    EditorState.createEmpty()
  );
  const getSelectedNote = () => {
    const jsonData = localStorage.getItem("mindMateData");
    const storedNotes = jsonData ? JSON.parse(jsonData) : { notes: [] };
    if (storedNotes.notes) {
      return storedNotes.notes.find(
        (note: { id: string }) => note.id === selectNote
      );
    }
  };

  const selectedNote = getSelectedNote();
  const [title, setTitle] = useState(selectedNote ? selectedNote.title : "");
  const handleTitleChange = (e: { target: { value: any } }) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (pattern.test(selectNote)) {
      if (selectedNote) {
        const contentState = convertHTMLToContentState(selectedNote.content);
        setModalEditorContent(EditorState.createWithContent(contentState));
      } else {
        setModalEditorContent(EditorState.createEmpty());
      }
    }
  }, [selectNote]);

  const convertHTMLToContentState = (htmlContent: string) => {
    const blocksFromHTML = htmlToDraft(htmlContent);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return contentState;
  };

  const handleToggleStyle = (style: string) => {
    setModalEditorContent(
      RichUtils.toggleInlineStyle(modalEditorContent, style)
    );
  };

  const handleToggleBlockType = (blockType: string) => {
    setModalEditorContent(
      RichUtils.toggleBlockType(modalEditorContent, blockType)
    );
  };

  const closeModal = () => {
    setModalOpen(false);
    window.location.href = "./notes";
  };

  const publishNote = () => {
    const contentState = modalEditorContent.getCurrentContent();
    const contentText = stateToHTML(contentState);

    const titleInput = document.getElementById("title") as HTMLInputElement;
    const newTitle = titleInput.value;

    const jsonData = localStorage.getItem("mindMateData");
    const existingData = jsonData ? JSON.parse(jsonData) : { notes: [] };

    if (selectedNote) {
      // Editing an existing note, find it in the notes array and update it
      const updatedNotes = existingData.notes.map((note: { id: any }) => {
        if (note.id === selectedNote.id) {
          return {
            ...note,
            title: newTitle,
            content: contentText,
            date: new Date().toISOString(),
          };
        }
        return note;
      });

      existingData.notes = updatedNotes;
    } else {
      // Creating a new note
      const newNote = {
        id: String(Date.now()),
        title: newTitle,
        content: contentText,
        date: new Date().toISOString(),
      };
      console.log(existingData);
      existingData.notes.push(newNote);
    }

    localStorage.setItem("mindMateData", JSON.stringify(existingData));
    console.log("Note published/updated:", newTitle);
  };

  return (
    <>
      {isModalOpen && (
        <div className="notes__modalcontainer">
          <div className="notes__modal">
            <div className="style-controls">
              <button
                className="button"
                onClick={() => handleToggleStyle("BOLD")}
              >
                <FontAwesomeIcon icon={faBold} />
              </button>
              <button
                className="button"
                onClick={() => handleToggleStyle("ITALIC")}
              >
                <FontAwesomeIcon icon={faItalic} />
              </button>
              <button
                className="button"
                onClick={() => handleToggleStyle("STRIKETHROUGH")}
              >
                <FontAwesomeIcon icon={faStrikethrough} />
              </button>
              <button
                className="button"
                onClick={() => handleToggleStyle("HIGHLIGHT")}
              >
                <FontAwesomeIcon icon={faHighlighter} />
              </button>
              <button
                className="button"
                onClick={() => handleToggleBlockType("header-one")}
              >
                H1
              </button>
              <button
                className="button"
                onClick={() => handleToggleBlockType("header-two")}
              >
                H2
              </button>
              <button
                style={{ marginRight: "auto" }}
                className="button"
                onClick={() => handleToggleBlockType("header-three")}
              >
                H3
              </button>
              {selectedNote && (
                <button className="button" onClick={publishNote}>
                  Save
                </button>
              )}
              {!selectedNote && (
                <button className="button" onClick={publishNote}>
                  Publish
                </button>
              )}
              <button className="button" onClick={closeModal}>
                X
              </button>
            </div>
            <div className="editor__title">
              <label>Title:</label>
              <input
                id="title"
                type="input"
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <Editor
              customStyleMap={styleMap}
              editorState={modalEditorContent}
              onChange={setModalEditorContent}
            />
            <MailButton
              title={selectedNote.title}
              data={selectedNote.content}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WysiwygEditor;
