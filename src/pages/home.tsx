import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const currentDate = new Date();
const currentDateFormated = currentDate.toISOString().slice(0, 10);

const jsonData = localStorage.getItem("mindMateData");
const storedData = jsonData && JSON.parse(jsonData);
const getStoredTasks = storedData ? storedData.tasks : [];
const getStoredEvents = storedData ? storedData.events : [];
const getStoredReminds = storedData ? storedData.Reminders : [];

const Home = () => {
  return (
    <div className="overview">
      <h2 className="overview__heading">
        Check your tasks, events, and reminders for today!
      </h2>
      <div className="overview__wrapper">
        <div className="overview__section">
          <h3>Reminder:</h3>
          {getStoredReminds
            .filter(
              (getStoredRemind: { date: string }) =>
                getStoredRemind.date.split("T")[0] === currentDateFormated
            )
            .map(
              (getStoredRemind: {
                [x: string]: ReactNode;
                id: string;
                title: string;
                date: any;
              }) => (
                <div key={getStoredRemind.id} className="overview__item">
                  <h4>
                    {getStoredRemind.title}{" "}
                    <FontAwesomeIcon icon={faArrowRightLong} />
                    &nbsp;
                    <span>{getStoredRemind.date.split("T")[1]}</span>
                  </h4>
                </div>
              )
            )}
        </div>

        <div className="overview__section">
          <h3>Events:</h3>
          {getStoredEvents
            .filter(
              (getStoredEvent: { eventDate: string }) =>
                getStoredEvent.eventDate === currentDateFormated
            )
            .map(
              (getStoredEvent: {
                [x: string]: ReactNode;
                id: string;
                title: string;
              }) => (
                <div key={getStoredEvent.id} className="overview__item">
                  <h4>
                    {getStoredEvent.title}{" "}
                    <FontAwesomeIcon icon={faArrowRightLong} />
                    &nbsp;
                    <span>{getStoredEvent.time}</span>
                  </h4>
                </div>
              )
            )}
        </div>
        <div className="overview__section">
          <h3>Tasks:</h3>
          {getStoredTasks
            .filter(
              (getStoredTask: { duedate: string }) =>
                getStoredTask.duedate === currentDateFormated
            )
            .map(
              (getStoredTask: {
                [x: string]: ReactNode;
                id: string;
                title: string;
              }) => (
                <div key={getStoredTask.id} className="overview__item">
                  <h4>
                    {getStoredTask.event}{" "}
                    <FontAwesomeIcon icon={faArrowRightLong} />
                    &nbsp;
                    <span>{getStoredTask.status}</span>
                  </h4>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
