import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface ReminderTaskProps {
  status: boolean | undefined;
}

const ReminderTask: React.FC<ReminderTaskProps> = ({ status }) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(status);

  const handleCheckboxChange = () => {
    // Update the isChecked state and any other logic you might need
    setIsChecked((prevValue) => !prevValue);
  };

  return (
    <div className={`reminder ${isChecked ? "reminder--active" : ""}`}>
      <FontAwesomeIcon className="reminder__icon" icon={faClock} />
      <input className="reminder__heading" type="text"></input>
      <p className="reminder__time-left">
        3 days 2h 5m <span>left</span>
      </p>
      <div className="reminder__details">
        <input type="datetime-local" className="reminder__date" />
        <label className="switch">
          <input
            type="checkbox"
            className="reminder__checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default ReminderTask;
