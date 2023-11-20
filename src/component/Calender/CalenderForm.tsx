import { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

const CalenderAddNew = () => {
  const jsonData = localStorage.getItem("mindMateData");
  const initialData = jsonData ? JSON.parse(jsonData) : { events: [] };

  const [events, setEvents] = useState(initialData.events || []);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    eventDate: "",
    eventType: "user-event",
    id: String(Date.now()),
    title: "",
    time: "",
  });

  const handleEditButtonClick = () => {
    setModalOpen(!isModalOpen);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [field]: value,
    }));
  };

  const handleAddEvent = () => {
    setEvents((prevEvents: any) => [...prevEvents, newEvent]);

    // Update only the "events" part of the JSON data.
    const updatedData = {
      ...initialData,
      events: [...(initialData.events || []), newEvent],
    };

    // Update localStorage with the updated data.
    localStorage.setItem("mindMateData", JSON.stringify(updatedData));

    // Reset the newEvent state for the next input.
    setNewEvent({
      eventDate: "",
      eventType: "user-event",
      id: String(Date.now()),
      title: "",
      time: "",
    });

    // Close the modal after adding the event.
    setModalOpen(false);
    window.location.reload();
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
          <input
            type="date"
            value={newEvent.eventDate}
            onChange={(e) => handleInputChange("eventDate", e.target.value)}
          />
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
          />
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          <button className="button" onClick={() => handleAddEvent()}>
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default CalenderAddNew;
