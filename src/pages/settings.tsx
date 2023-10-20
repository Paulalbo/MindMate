import { useState, useEffect } from "react";

import DropZone from "../component/DropZone/DropZone";
import JsonExport from "../component/JsonExport/JsonExport";

const Settings = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("jsonData");
    if (storedData) {
      setJsonData(JSON.parse(storedData));
    }
  }, []);
  const handleRemoveFromLocalStorage = () => {
    localStorage.removeItem("jsonData");
    setJsonData(null);
  };
  return (
    <>
      <DropZone setJsonData={setJsonData} />
      {jsonData && (
        <>
          <button
            className="button button--remove-local"
            onClick={handleRemoveFromLocalStorage}
          >
            Remove Data from Local Storage
          </button>
        </>
      )}
      <JsonExport data={jsonData} />
    </>
  );
};

export default Settings;
