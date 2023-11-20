import React, { useState } from "react";
import CalenderEvent from "./CalenderEvent";
import "./style.css";

interface CalenderDayProps {
  date: string; // Updated format to "DD-MM-YYYY"
  statusCheck: string;
}

const CalenderDay: React.FC<CalenderDayProps> = ({ date, statusCheck }) => {
  const dayFull = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const dayNum = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
  });
  const jsonData = localStorage.getItem("mindMateData");
  const initialData = jsonData
    ? JSON.parse(jsonData)
    : { tasks: [], Reminders: [], events: [] };

  const [events, setEvents] = useState(initialData.events);

  const getTaskData = initialData.tasks || [];
  const getReminderData = initialData.Reminders || [];
  const getEventsData = initialData.events;
  // Transform tasks into the desired format and filter out "Done" tasks
  const taskData = getTaskData.map(
    (task: { status: any; id: any; duedate: any; event: any }) => ({
      id: task.id,
      eventDate: task.duedate,
      time: "23:00", // Adjust this as needed
      eventType: "task-event",
      title: task.event,
      eventStatus: task.status === "Done" ? false : true,
    })
  );

  const reminderData = getReminderData.map(
    (reminder: { status: any; id: any; date: any; title: any }) => ({
      id: reminder.id,
      eventDate: reminder.date.split("T")[0],
      time: reminder.date.split("T")[1],
      eventType: "reminder-event",
      title: reminder.title,
      eventStatus: reminder.status,
    })
  );

  const combinedEventData = [...taskData, ...reminderData, ...getEventsData];
  // Filter events based on the provided date
  const filteredEvents = combinedEventData
    .filter((eventData: { eventDate: string }) => eventData.eventDate === date)
    .sort((a: { time: string }, b: { time: string }) => {
      // Convert time to minutes since midnight for comparison
      const timeA =
        Number(a.time.split(":")[0]) * 60 + Number(a.time.split(":")[1]);
      const timeB =
        Number(b.time.split(":")[0]) * 60 + Number(b.time.split(":")[1]);
      return timeA - timeB;
    });

  const handleEventDelete = (eventId: any) => {
    const updatedEvents = events.filter(
      (event: { id: any }) => event.id !== eventId
    );
    setEvents(updatedEvents);

    // Update only the "tasks" part of the JSON data.
    const updatedData = {
      ...initialData,
      events: updatedEvents,
    };

    // Update localStorage with the updated data.
    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
  };

  return (
    <div className={`calender__day  calender__day--${statusCheck}`}>
      <div className="calender__top">
        <p className="calender__name">{dayFull}</p>
      </div>
      <div className="calender__inner-container">
        <h2 className="calender__title">{dayNum}</h2>
        <div className="calender__events">
          {filteredEvents.map((eventData: any) => (
            <CalenderEvent
              key={eventData.id}
              event={eventData}
              onDelete={handleEventDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalenderDay;
