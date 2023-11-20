import { Key } from "react";
import CalenderDay from "../component/Calender/CalenderDay";
import CalenderAddNew from "../component/Calender/CalenderForm";

const Calender = () => {
  // just for testing --> const getTomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
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

  // Generate date arrays for the last week, current week, and the next two weeks
  const lastWeekDates = generateDateArray(-7, -1);
  const currentWeekDates = generateDateArray(0, 6);
  const nextWeekDates = generateDateArray(7, 13);
  const inTwoWeekDates = generateDateArray(14, 20);

  return (
    <div className="calender">
      <CalenderAddNew />
      <div className="calender__wrapper">
        {/* Last week */}
        <div className="calender__week">
          {lastWeekDates.map((date: string, index: Key | null | undefined) => (
            <CalenderDay
              key={index}
              date={date}
              statusCheck={dayStatus(date)}
            />
          ))}
        </div>

        {/* Current week */}
        <div className="calender__week">
          {currentWeekDates.map(
            (date: string, index: Key | null | undefined) => (
              <CalenderDay
                key={index}
                date={date}
                statusCheck={dayStatus(date)}
              />
            )
          )}
        </div>

        {/* Next week */}
        <div className="calender__week">
          {nextWeekDates.map((date: string, index: Key | null | undefined) => (
            <CalenderDay
              key={index}
              date={date}
              statusCheck={dayStatus(date)}
            />
          ))}
        </div>

        {/* In two weeks */}
        <div className="calender__week">
          {inTwoWeekDates.map((date: string, index: Key | null | undefined) => (
            <CalenderDay
              key={index}
              date={date}
              statusCheck={dayStatus(date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calender;
