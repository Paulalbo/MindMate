import "./style.css";

interface CalenderDayProps {
  date: string;
  statusCheck: string;
}

const CalenderDay: React.FC<CalenderDayProps> = ({ date, statusCheck }) => {
  const dayFull = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const dayNum = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
  });

  return (
    <div className={`calender__day  calender__day--` + statusCheck}>
      <div className="calender__top">
        <p className="calender__name">{dayFull}</p>
      </div>
      <div className="calender__inner-container">
        <h2 className="calender__title">{dayNum}</h2>
        <div className="calender__events">
          <div className="calender__event">
            <textarea value="termin 1"></textarea>
            <input type="time" value="11:30"></input>
          </div>

          <div className="calender__event">
            <textarea value="termin afternoon"></textarea>
            <input type="time" value="16:30"></input>
          </div>
          <div className="calender__event">
            <textarea value="termin afternoon"></textarea>
            <input type="time" value="16:30"></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderDay;
