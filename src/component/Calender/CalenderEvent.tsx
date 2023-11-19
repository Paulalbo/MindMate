import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";

interface CalenderEventProps {
  event: any;
}

const CalenderEvent: React.FC<CalenderEventProps> = ({ event }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEditButtonClick = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div
      className={`calender__event calender__event--${event.eventType}`}
      key={event.id}
    >
      <textarea value={event.title} />
      <input type="time" value={event.time} />
      <div className="calender__edit">
        <button
          className="button button--edit"
          onClick={() => handleEditButtonClick()}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
        {isModalOpen && (
          <div className="calender__modal">
            <button className="button button--delete">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderEvent;
