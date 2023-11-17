import "./style.css";

const CalenderDay = () => {
  return (
    <div className="calender__day">
      <div className="calender__top">
        <p className="calender__name">Monday</p>
      </div>
      <div className="calender__inner-container">
        <h2 className="calender__title">01</h2>
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
