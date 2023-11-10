import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Navbar from "./component/Navbar/Navbar";
import Header from "./component/HeaderComponent/Header";

// Pages

import Calender from "./pages/calender";
import Reminder from "./pages/Reminder";
import Notes from "./pages/notes";
import TaskPage from "./pages/task-page";
import Settings from "./pages/settings";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Settings />} />
            <Route path="/task-page" element={<TaskPage />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/reminder" element={<Reminder />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
