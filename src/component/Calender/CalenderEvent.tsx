import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faTrash,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

interface CalenderEventProps {
  event: any;
  onDelete: (eventId: string) => void;
  onUpdate: (eventId: string, updatedEvent: any) => void;
}

const CalenderEvent: React.FC<CalenderEventProps> = ({
  event,
  onDelete,
  onUpdate,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleEditButtonClick = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    // Adjust the height of the textarea on load
    const textarea = document.getElementById(event.id);
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [event.id]);

  const handleStatusChange = (
    newTitleValue: string,
    newTimevalue: string,
    newDateValue: string
  ) => {
    onUpdate(event.id, {
      ...event,
      title: newTitleValue,
      time: newTimevalue,
      eventDate: newDateValue,
    });
  };

  return (
    <div
      className={`calender__event calender__event--${event.eventType} calender__event--${event.eventStatus}`}
      key={event.id}
    >
      <input
        type="time"
        value={event.time}
        onChange={(e) =>
          handleStatusChange(event.title, e.target.value, event.eventDate)
        }
      />
      {event.eventType == "user-event" && (
        <input
          type="date"
          value={event.eventDate}
          onChange={(e) =>
            handleStatusChange(event.title, event.time, e.target.value)
          }
        />
      )}
      {event.eventType == "task-event" && (
        <a
          className="task-link"
          target="_blank"
          href={`./task-page?task=${event.id}`}
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </a>
      )}
      <textarea
        id={event.id}
        value={event.title}
        onChange={(e) =>
          handleStatusChange(e.target.value, event.time, event.eventDate)
        }
        style={{ overflowY: "hidden", height: "auto" }}
      />
      <div className="calender__edit">
        <button
          className="button button--edit"
          onClick={() => handleEditButtonClick()}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
        {isModalOpen && (
          <div className="calender__modal">
            <button
              className="button button--delete"
              onClick={() => onDelete(event.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderEvent;
