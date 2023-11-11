import ReminderTask from "../component/ReminderTask/ReminderTask";
const Reminders = () => {
  return (
    <div>
      <h1>
        RE <u>MIND</u> ER
      </h1>
      <p>
        coming soon, possiblity so set some alarms/reminders that will pop up at
        a specific date time
      </p>
      <div className="reminder__wrapper">
        <ReminderTask status={true} />
        <ReminderTask status={false} />
        <ReminderTask status={true} />
        <ReminderTask status={true} />
      </div>
    </div>
  );
};

export default Reminders;
