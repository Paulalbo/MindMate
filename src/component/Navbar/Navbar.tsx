import "./style.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faBookOpen,
  faAward,
  faCalendarDays,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="navbar">
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
        <li className="navbar__item navbar__item--life-goals">
          <FontAwesomeIcon icon={faAward} />
          <Link className="navbar__link" to="/life-goals">
            Life Goals
          </Link>
        </li>
        <li className="navbar__item navbar__item--calender">
          <FontAwesomeIcon icon={faCalendarDays} />
          <Link className="navbar__link" to="/calender">
            Calender
          </Link>
        </li>
        <li className="navbar__item navbar__item--settings">
          <FontAwesomeIcon icon={faScrewdriverWrench} />
          <Link className="navbar__link" to="/settings">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
