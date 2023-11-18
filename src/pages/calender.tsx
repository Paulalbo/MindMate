import { Key } from "react";
import CalenderDay from "../component/Calender/CalenderDay";
import CalenderAddNew from "../component/Calender/CalenderForm";

const Calender = () => {
  const currentDate = new Date();
  const currentDateFormated = currentDate.toISOString().slice(0, 10);

  const generateDateArray = () => {
    const dateArray = [];
    for (let i = -3; i <= 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + i);
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

  const dateArray = generateDateArray();

  return (
    <div className="calender">
      <CalenderAddNew />
      <div className="calender__wrapper">
        {dateArray.map((date: string, index: Key | null | undefined) => (
          <CalenderDay key={index} date={date} statusCheck={dayStatus(date)} />
        ))}
      </div>
    </div>
  );
};

export default Calender;
