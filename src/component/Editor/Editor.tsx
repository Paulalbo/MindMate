import "./style.css";
import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

import "draft-js/dist/Draft.css";

const customStyleMap = {
  H1: {
    fontSize: "30px",
    fontWeight: "900",
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

  return (
    <div className="Editor">
      <div className="style-controls">
        <button onClick={toggleBold}>Bold</button>
        <button onClick={toggleItalic}>Italic</button>
        <button onClick={toggleHeading1}>H1</button>
        <button onClick={toggleHeading2}>H2</button>
        <button onClick={toggleHeading3}>H3</button>
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
