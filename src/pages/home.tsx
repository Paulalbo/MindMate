import { ReactNode } from "react";

const currentDate = new Date();
const currentDateFormated = currentDate.toISOString().slice(0, 10);

const jsonData = localStorage.getItem("mindMateData");
const storedData = jsonData && JSON.parse(jsonData);
const getStoredTasks = storedData ? storedData.tasks : [];
const getStoredEvents = storedData ? storedData.events : [];
const getStoredReminds = storedData ? storedData.Reminders : [];

const Home = () => {
  const filteredReminders = getStoredReminds.filter(
    (getStoredRemind: { date: string }) =>
      getStoredRemind.date.split("T")[0] === currentDateFormated
  );

  const filteredEvents = getStoredEvents.filter(
    (getStoredEvent: { eventDate: string }) =>
      getStoredEvent.eventDate === currentDateFormated
  );

  const filteredTasks = getStoredTasks.filter(
    (getStoredTask: { duedate: string }) =>
      getStoredTask.duedate === currentDateFormated
  );

  return (
    <div className="overview">
      <h2 className="overview__heading">
        Check your tasks, events, and reminders for today!
      </h2>
      <div className="overview__wrapper">
        <div className="overview__section">
          <h3>Reminder:</h3>
          {filteredReminders.length > 0 ? (
            filteredReminders.map(
              (getStoredRemind: {
                [x: string]: ReactNode;
                id: string;
                title: string;
                date: any;
              }) => (
                <div key={getStoredRemind.id} className="overview__item">
                  <h4>
                    {getStoredRemind.title}{" "}
                    <span>{getStoredRemind.date.split("T")[1]}</span>
                  </h4>
                </div>
              )
            )
          ) : (
            <p>No Reminders today, nice, no stress, go catch some air</p>
          )}
        </div>

        <div className="overview__section">
          <h3>Events:</h3>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(
              (getStoredEvent: {
                [x: string]: ReactNode;
                id: string;
                title: string;
              }) => (
                <div key={getStoredEvent.id} className="overview__item">
                  <h4>
                    {getStoredEvent.title} <span>{getStoredEvent.time}</span>
                  </h4>
                </div>
              )
            )
          ) : (
            <p>No Events today, amazing, let's relax</p>
          )}
        </div>

        <div className="overview__section">
          <h3>Tasks:</h3>
          {filteredTasks.length > 0 ? (
            filteredTasks.map(
              (getStoredTask: {
                [x: string]: ReactNode;
                id: string;
                title: string;
              }) => (
                <div key={getStoredTask.id} className="overview__item">
                  <h4>
                    {getStoredTask.event} <span>{getStoredTask.status}</span>
                  </h4>
                </div>
              )
            )
          ) : (
            <p>No Tasks today, relax and take a nap</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
