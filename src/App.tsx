import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Navbar from "./component/Navbar/Navbar";
import Header from "./component/HeaderComponent/Header";
import TaskList from "./component/TaskList/TaskList";
import DropZone from "./component/DropZone/DropZone";
import JsonExport from "./component/JsonExport/JsonExport";

// Pages

import Calender from "./pages/calender";
import LifeGoals from "./pages/life-goals";
import Notes from "./pages/notes";
import Tasks from "./pages/task-page";

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
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/task-page" element={<Tasks />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/life-goals" element={<Calender />} />
            <Route path="/calender" element={<LifeGoals />} />
          </Routes>
        </div>
      </BrowserRouter>
      <DropZone setJsonData={setJsonData} />
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
