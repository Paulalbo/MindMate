import { useState } from "react";

import DropZone from "../component/DropZone/DropZone";
import JsonExport from "../component/JsonExport/JsonExport";

const Settings = () => {
  const [jsonData, setJsonData] = useState(null);
  let mindMateData = localStorage.getItem("mindMateData");
  let mindMateDataPreview = mindMateData
    ? JSON.stringify(JSON.parse(mindMateData), null, 2)
    : "no JSON to preview";
  const storedData = mindMateData ? JSON.parse(mindMateData) : "";

  const handleRemoveFromLocalStorage = () => {
    localStorage.removeItem("mindMateData");
    setJsonData(null);
  };
  const [name, setName] = useState(storedData ? storedData.name : "");
  const handleNameChange = (e: { target: { value: any } }) => {
    setName(e.target.value);
  };
  const saveName = () => {
    // Create a new object with the updated name and the existing data
    const updatedData = { ...storedData, name };

    // Store the updated data in localStorage
    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
    window.location.href = "./";
  };

  return (
    <>
      <div>
        <label>Name: </label>
        <input
          className="input"
          type="text"
          value={name}
          onChange={handleNameChange}
        ></input>
        <button className="button" onClick={saveName}>
          save
        </button>
      </div>
      <DropZone setJsonData={setJsonData} />
      {storedData && (
        <>
          <button
            className="button button--remove-local"
            onClick={handleRemoveFromLocalStorage}
          >
            Remove Data from Local Storage
          </button>
        </>
      )}
      <JsonExport data={storedData} />
      <div className="jsonPreview__container">
        <h3>Json Data Preview</h3>
        <pre className="jsonPreview__data">{mindMateDataPreview}</pre>
      </div>
    </>
  );
};

export default Settings;
