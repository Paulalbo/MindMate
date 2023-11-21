import "./style.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faBookOpen,
  faClock,
  faCalendarDays,
  faUser,
  faPersonDigging,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="navbar__profile" to="/settings">
        <FontAwesomeIcon icon={faUser} />
      </Link>
      <ul className="navbar__wrapper">
        <li className="navbar__item navbar__item--tasks">
          <FontAwesomeIcon icon={faListCheck} />
          <Link className="navbar__link" to="/task-page">
            Tasks
          </Link>
        </li>
        <li className="navbar__item navbar__item--notes">
          <FontAwesomeIcon icon={faBookOpen} />
          <Link className="navbar__link" to="/notes">
            Notes
          </Link>
        </li>
        <li className="navbar__item navbar__item--reminder">
          <FontAwesomeIcon icon={faClock} />
          <Link className="navbar__link" to="/reminder">
            Reminder
          </Link>
        </li>
        <li className="navbar__item navbar__item--calender">
          <FontAwesomeIcon icon={faCalendarDays} />
          <Link className="navbar__link" to="/calender">
            Calender
          </Link>
        </li>
        <li className="navbar__item navbar__item--in-progress">
          <FontAwesomeIcon icon={faPersonDigging} />
          <Link className="navbar__link" to="/in-progress">
            in progress{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
