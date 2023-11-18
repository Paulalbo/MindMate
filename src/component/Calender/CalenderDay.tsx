import React, { useState } from "react";
import CalenderEvent from "../component/Calender/CalenderEvent";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";

interface CalenderDayProps {
  date: string;
  statusCheck: string;
}

const CalenderDay: React.FC<CalenderDayProps> = ({ date, statusCheck }) => {
  const [modalStates, setModalStates] = useState([false, false, false]);

  const dayFull = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const dayNum = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
  });

  const handleEditButtonClick = (index: number) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = !newModalStates[index];
    setModalStates(newModalStates);
  };

  return (
    <div className={`calender__day  calender__day--` + statusCheck}>
      <div className="calender__top">
        <p className="calender__name">{dayFull}</p>
      </div>
      <div className="calender__inner-container">
        <h2 className="calender__title">{dayNum}</h2>
        <div className="calender__events">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="calender__event" key={index}>
              <textarea value={`termin ${index + 1}`} />
              <input type="time" value="11:30" />
              <div className="calender__edit">
                <button
                  className="button button--edit"
                  onClick={() => handleEditButtonClick(index)}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
                {modalStates[index] && (
                  <div className="calender__modal">
                    <button className="button button--delete">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalenderDay;
