import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Navbar from "./component/Navbar/Navbar";
import Header from "./component/HeaderComponent/Header";
import ReminderNotification from "./component/ReminderNotification/ReminderNotification";

// Pages

import Calender from "./pages/calender";
import Reminder from "./pages/Reminder";
import Notes from "./pages/notes";
import TaskPage from "./pages/task-page";
import Settings from "./pages/settings";
import Home from "./pages/home";

function App() {
  return (
    <>
      <ReminderNotification />
      <Header />
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task-page" element={<TaskPage />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/reminder" element={<Reminder />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
      <p>
        developed by <strong>Paul Albrecht</strong>
      </p>
    </>
  );
}

export default App;
