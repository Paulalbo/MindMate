import "./style.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/task-page">Tasks</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/life-goals">Life Goals</Link>
        </li>
        <li>
          <Link to="/calender">Calender</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
