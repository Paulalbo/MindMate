import { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

const CalenderAddNew = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEditButtonClick = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="calender__new-event">
      <button
        className="button button--edit"
        onClick={() => handleEditButtonClick()}
      >
        <FontAwesomeIcon icon={faCalendarPlus} /> New Event
      </button>
      {isModalOpen && (
        <div className="calender__event-form">
          <input type="date"></input>
          <input type="time"></input>
          <input type="text"></input>
          <button className="button">Add</button>
        </div>
      )}
    </div>
  );
};

export default CalenderAddNew;
