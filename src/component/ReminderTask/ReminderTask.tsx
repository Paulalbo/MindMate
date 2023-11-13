import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface ReminderTaskProps {
  reminder: any;
  onUpdate: (reminderId: string, updatedReminder: any) => void;
}

const ReminderTask: React.FC<ReminderTaskProps> = ({ reminder, onUpdate }) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(
    reminder.status
  );

  useEffect(() => {
    // This effect will run whenever the `status` prop changes
    setIsChecked(reminder.status);
  }, [reminder.status]);

  const handleStatusChange = (
    newTitleValue: string,
    newStatusValue: boolean
  ) => {
    // Update the isChecked state and any other logic you might need
    onUpdate(reminder.id, {
      ...reminder,
      title: newTitleValue,
      status: newStatusValue,
    });
  };

  return (
    <div className={`reminder ${isChecked ? "reminder--active" : ""}`}>
      <FontAwesomeIcon className="reminder__icon" icon={faClock} />
      <input
        className="reminder__heading"
        type="text"
        value={reminder.title}
        onChange={(e) => handleStatusChange(e.target.value, reminder.status)}
      ></input>
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
            onChange={(e) =>
              handleStatusChange(reminder.title, e.target.checked)
            }
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default ReminderTask;
