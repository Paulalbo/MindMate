import { useState } from "react";
import { Key } from "react";
import CalenderDay from "../component/Calender/CalenderDay";
import CalenderAddNew from "../component/Calender/CalenderForm";

const Calender = () => {
  const currentDate = new Date();
  const currentDateFormated = currentDate.toISOString().slice(0, 10);

  const getMonday = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const generateDateArray = (startOffset: number, endOffset: number) => {
    const dateArray = [];
    for (let i = startOffset; i <= endOffset; i++) {
      const date = getMonday(currentDate);
      date.setDate(date.getDate() + i);
      dateArray.push(date.toISOString().slice(0, 10)); // Format as "YYYY-MM-DD"
    }
    return dateArray;
  };

  const dayStatus = (day: string | number) => {
    if (day == currentDateFormated) {
      return "today";
    } else if (day < currentDateFormated) {
      return "past";
    } else {
      return "upcoming";
    }
  };

  const renderWeek = (startOffset: number, endOffset: number) => (
    <div className="calender__week">
      {generateDateArray(startOffset, endOffset).map(
        (date: string, index: Key | null | undefined) => (
          <CalenderDay key={index} date={date} statusCheck={dayStatus(date)} />
        )
      )}
    </div>
  );

  const [renderedWeeks, setRenderedWeeks] = useState(4);

  const renderNextWeek = () => {
    setRenderedWeeks((prevRenderedWeeks) => prevRenderedWeeks + 1);
  };

  const renderDefaultView = (renderWeeks: number) => (
    <div>
      {Array.from({ length: renderWeeks }, (_, index) =>
        renderWeek(index * 7 - 7, index * 7 - 1)
      )}
    </div>
  );

  return (
    <div className="calender">
      <CalenderAddNew />
      <div className="calender__wrapper">
        {renderDefaultView(renderedWeeks)}
        <button className="button" onClick={renderNextWeek}>
          Render upcoming week
        </button>
      </div>
    </div>
  );
};

export default Calender;
