import React from "react";
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
  const initialData = jsonData ? JSON.parse(jsonData) : { tasks: [] };
  const getTaskData = initialData.tasks;

  // Transform tasks into the desired format and filter out "Done" tasks
  const testData = getTaskData
    .filter((task: { status: string }) => task.status !== "Done")
    .map((task: { id: any; duedate: any; event: any }) => ({
      id: task.id,
      eventDate: task.duedate,
      time: "23:00", // Adjust this as needed
      eventType: "task-event",
      title: task.event,
    }));

  // Filter events based on the provided date
  const filteredEvents = testData
    .filter((eventData: { eventDate: string }) => eventData.eventDate === date)
    .sort((a: { time: string }, b: { time: string }) => {
      // Convert time to minutes since midnight for comparison
      const timeA =
        Number(a.time.split(":")[0]) * 60 + Number(a.time.split(":")[1]);
      const timeB =
        Number(b.time.split(":")[0]) * 60 + Number(b.time.split(":")[1]);
      return timeA - timeB;
    });

  return (
    <div className={`calender__day  calender__day--${statusCheck}`}>
      <div className="calender__top">
        <p className="calender__name">{dayFull}</p>
      </div>
      <div className="calender__inner-container">
        <h2 className="calender__title">{dayNum}</h2>
        <div className="calender__events">
          {filteredEvents.map((eventData: any) => (
            <CalenderEvent key={eventData.id} event={eventData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalenderDay;
