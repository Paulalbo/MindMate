import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface ReminderTaskProps {
  status: boolean | undefined;
}

const ReminderTask: React.FC<ReminderTaskProps> = ({ status }) => {
  //const jsonData = localStorage.getItem("mindMateData");
  //const storedData = jsonData ? JSON.parse(jsonData) : "";

  return (
    <div className="reminder">
      <FontAwesomeIcon className="reminder__icon" icon={faClock} />
      <h3 className="reminder__heading">test dummy data, reminder title</h3>
      <div className="reminder__details">
        <input type="date" className="reminder__date"></input>
        <input
          type="checkbox"
          className="reminder__checkbox"
          checked={status ? true : false}
        ></input>
      </div>
    </div>
  );
};

export default ReminderTask;
