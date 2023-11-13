import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface ReminderTaskProps {
  reminder: any;
  status: boolean | undefined;
  onUpdate: (reminderId: string, updatedReminder: any) => void;
}

const ReminderTask: React.FC<ReminderTaskProps> = ({
  reminder,
  status,
  onUpdate,
}) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(status);

  useEffect(() => {
    // This effect will run whenever the `status` prop changes
    setIsChecked(status);
  }, [status]);

  const handleStatusChange = (newStatusValue: boolean) => {
    // Update the isChecked state and any other logic you might need
    onUpdate(reminder.id, {
      ...reminder,
      status: newStatusValue,
    });
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
            onChange={(e) => handleStatusChange(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default ReminderTask;
