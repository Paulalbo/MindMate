import CalenderDay from "../component/Calender/CalenderEvent";

const Calender = () => {
  const currentDate = new Date();
  const currentDateFormated = currentDate.toISOString().slice(0, 10);

  const generateDateArray = () => {
    const dateArray = [];
    for (let i = -2; i <= 7; i++) {
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
      {dateArray.map((date, index) => (
        <CalenderDay key={index} date={date} statusCheck={dayStatus(date)} />
      ))}
    </div>
  );
};

export default Calender;
