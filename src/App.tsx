import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Navbar from "./component/Navbar/Navbar";
import Header from "./component/HeaderComponent/Header";

// Pages

import Calender from "./pages/calender";
import LifeGoals from "./pages/life-goals";
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
            <Route path="/life-goals" element={<Calender />} />
            <Route path="/calender" element={<LifeGoals />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
