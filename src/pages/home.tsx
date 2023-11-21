const Home = () => {
  return (
    <div className="overview">
      <h2 className="overview__heading">
        Check your tasks, events and reminders for today!
      </h2>
      <div className="overview__wrapper">
        <div className="overview__section">
          <h3>Tasks:</h3>
          <p>Task 1 – due today</p>
          <p>Task 2 – due today</p>
        </div>
        <div className="overview__section">
          <h3>Events:</h3>
          <p>Event 1 – today at 13:00</p>
          <p>Event 2 – today at 15:30</p>
        </div>
        <div className="overview__section overview__section--full-width">
          <h3>Reminder:</h3>
          <p>Reminder 1 – go food shooping at 18:00</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
