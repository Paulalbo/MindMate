import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ReminderTaskProps {
  reminder: any;
  onUpdate: (reminderId: string, updatedReminder: any) => void;
  onDelete: (reminderId: string) => void;
}

const ReminderTask: React.FC<ReminderTaskProps> = ({
  reminder,
  onUpdate,
  onDelete,
}) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(
    reminder.status
  );
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    setIsChecked(reminder.status);

    // Calculate and set the time left when the component mounts
    calculateTimeLeft(reminder.date);

    // Set up an interval to update the time left every second (you can adjust the interval as needed)
    const interval = setInterval(() => {
      calculateTimeLeft(reminder.date);
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [reminder.status, reminder.date]);

  const handleStatusChange = (
    newTitleValue: string,
    newStatusValue: boolean,
    newDateValue: string
  ) => {
    onUpdate(reminder.id, {
      ...reminder,
      title: newTitleValue,
      status: newStatusValue,
      date: newDateValue,
    });
  };

  // calculate time left
  const calculateTimeLeft = (reminderDate: string) => {
    const currentTime = new Date();
    const targetTime = new Date(reminderDate);
    const timeDifference = targetTime.getTime() - currentTime.getTime();

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      let timeLeftString = "";
      if (days > 0) {
        timeLeftString += `${days} day${days !== 1 ? "s" : ""} `;
      }
      if (hours > 0) {
        timeLeftString += `${hours}h `;
      }
      if (minutes > 0) {
        timeLeftString += `${minutes}m `;
      }
      if (seconds > 0 || timeLeftString === "") {
        timeLeftString += `${seconds}s `;
      }

      setTimeLeft(timeLeftString.trim());
    } else {
      setTimeLeft("Reminder expired");
    }
  };

  return (
    <div className={`reminder ${isChecked ? "reminder--active" : ""}`}>
      <FontAwesomeIcon className="reminder__icon" icon={faClock} />
      <button
        className="button reminder__button reminder__button--delete"
        onClick={() => onDelete(reminder.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <input
        className="reminder__heading"
        type="text"
        value={reminder.title}
        onChange={(e) =>
          handleStatusChange(e.target.value, reminder.status, reminder.date)
        }
      ></input>
      <p className="reminder__time-left">{timeLeft}</p>
      <div className="reminder__details">
        <input
          type="datetime-local"
          className="reminder__date"
          value={reminder.date}
          onChange={(e) => {
            handleStatusChange(reminder.title, reminder.status, e.target.value);
          }}
        />
        <label className="switch">
          <input
            type="checkbox"
            className="reminder__checkbox"
            checked={isChecked}
            onChange={(e) =>
              handleStatusChange(
                reminder.title,
                e.target.checked,
                reminder.date
              )
            }
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default ReminderTask;
