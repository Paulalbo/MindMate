import "./style.css";
import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

import "draft-js/dist/Draft.css";

const customStyleMap = {
  H1: {
    fontSize: "30px",
    fontWeight: "900",
    background: "#fafafa",
    TextTransform: "uppercase",
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
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  // Add custom styling buttons

  const toggleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const toggleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };
  const toggleHeading1 = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "H1"));
  };
  const toggleHeading2 = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "H2"));
  };
  const toggleHeading3 = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "H3"));
  };

  // Export to PDF

  return (
    <div className="editor">
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
        <button className="button" onClick={toggleHeading3}>
          H3
        </button>
        <button className="button">Export to PDF</button>
        <button className="button" style={{ marginLeft: "auto" }}>
          Save
        </button>
      </div>
      <div className="editor__title">
        <label>Title:</label>
        <input id="title" type="input"></input>
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        customStyleMap={customStyleMap}
      />
    </div>
  );
}

export default WysiwygEditor;
