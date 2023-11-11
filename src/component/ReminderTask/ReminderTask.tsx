import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface ReminderTaskProps {
  status: boolean | undefined;
}

const ReminderTask: React.FC<ReminderTaskProps> = ({ status }) => {
  return (
    <div className={`reminder ${status ? "reminder--active" : ""}`}>
      <FontAwesomeIcon className="reminder__icon" icon={faClock} />
      <h3 className="reminder__heading">Reminder Title</h3>
      <p className="reminder__time-left">
        3 days 2h 5m <span>left</span>
      </p>
      <div className="reminder__details">
        <input type="date" className="reminder__date" />
        <label class="switch">
          <input
            type="checkbox"
            className="reminder__checkbox"
            checked={status ? true : false}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default ReminderTask;
