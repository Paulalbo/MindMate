import "./App.css";
import { useState, useEffect } from "react";

// components
import Header from "./component/HeaderComponent/Header";
import TaskList from "./component/TaskList/TaskList";
import DropZone from "./component/DropZone/DropZone";
import JsonExport from "./component/JsonExport/JsonExport";

function App() {
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
      <Header />
      <DropZone setJsonData={setJsonData} />
      {/* Add form to add task, name, ... if data is not exisiting, first time user */}
      {jsonData && (
        <>
          <TaskList jsonData={jsonData} />
          <button onClick={handleRemoveFromLocalStorage}>
            Remove Data from Local Storage
          </button>
        </>
      )}
      <JsonExport data={jsonData} />
    </>
  );
}

export default App;
