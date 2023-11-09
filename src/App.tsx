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

// Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq8R6qjnLLzdnUXDolfkcgkHevsF4JPgA",
  authDomain: "mindmate-72d08.firebaseapp.com",
  projectId: "mindmate-72d08",
  storageBucket: "mindmate-72d08.appspot.com",
  messagingSenderId: "591561633640",
  appId: "1:591561633640:web:17a572a493c45e4c9b30dd",
  measurementId: "G-ERDBP4D096",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
            <Route path="/life-goals" element={<LifeGoals />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
