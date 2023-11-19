import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";

interface CalenderEventProps {
  event: any;
  onDelete: (eventId: string) => void;
}

const CalenderEvent: React.FC<CalenderEventProps> = ({ event, onDelete }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [textareaValue, setTextareaValue] = useState(event.title);
  const [inputValue, setInputValue] = useState(event.time);

  const handleEditButtonClick = () => {
    setModalOpen(!isModalOpen);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // Adjust the height of the textarea on load
    const textarea = document.getElementById(event.id);
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [event.id]);

  return (
    <div
      className={`calender__event calender__event--${event.eventType}`}
      key={event.id}
    >
      <input type="time" value={inputValue} onChange={handleInputChange} />
      <textarea
        id={event.id}
        value={textareaValue}
        onChange={handleTextareaChange}
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
