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
  const testData = [
    {
      id: "123",
      eventDate: "2023-11-18",
      time: "13:30",
      eventType: "user-event",
      title: "Event on 18.",
    },
    {
      id: "1234",
      eventDate: "2023-11-19",
      time: "16:30",
      eventType: "reminder-event",
      title: "Event on 19.",
    },
    {
      id: "234",
      eventDate: "2023-11-20",
      time: "16:30",
      eventType: "task-event",
      title: "Party on 20.",
    },
    {
      id: "345",
      eventDate: "2023-11-20",
      time: "15:30",
      eventType: "user-event",
      title: "Thing on 20. later",
    },
    {
      id: "345",
      eventDate: "2023-11-20",
      time: "09:30",
      eventType: "user-event",
      title: "date time check",
    },
  ];

  // Filter events based on the provided date
  const filteredEvents = testData
    .filter((eventData) => eventData.eventDate === date)
    .sort((a, b) => {
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
          {filteredEvents.map((eventData) => (
            <CalenderEvent event={eventData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalenderDay;
