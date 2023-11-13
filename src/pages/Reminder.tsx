import { useState } from "react";
import ReminderTask from "../component/ReminderTask/ReminderTask";
const ReminderList = () => {
  const jsonData = localStorage.getItem("mindMateData");
  const initialData = jsonData ? JSON.parse(jsonData) : { Reminders: [] };

  const [reminders, setReminders] = useState(initialData.Reminders);

  const handleAddReminder = () => {
    const newReminder = {
      id: String(Date.now()),
      title: "",
      status: false,
    };

    setReminders((prevReminders: any) => [...prevReminders, newReminder]);

    // Update only the "Reminders" part of the JSON data.
    const updatedData = {
      ...initialData,
      Reminders: [...initialData.Reminders, newReminder],
    };

    // Update localStorage with the updated data.
    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
  };

  const handleReminderUpdate = (reminderId: any, updatedReminder: any) => {
    const updatedReminders = reminders.map((reminder: { id: any }) =>
      reminder.id === reminderId ? updatedReminder : reminder
    );
    setReminders(updatedReminders);

    // Update only the "tasks" part of the JSON data.
    const updatedData = {
      ...initialData,
      Reminders: updatedReminders,
    };

    // Update localStorage with the updated data.
    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
  };

  return (
    <div>
      <h1>
        RE<b>MIND</b>ER
      </h1>
      <p>
        coming soon, possiblity so set some alarms/reminders that will pop up at
        a specific date time
      </p>
      <button className="button tasklist__button" onClick={handleAddReminder}>
        Add Reminder
      </button>
      <div className="reminder__wrapper">
        {reminders &&
          reminders.map(
            (reminder: {
              id: React.Key | null | undefined;
              status: boolean;
            }) => (
              <ReminderTask
                key={reminder.id}
                status={reminder.status}
                onUpdate={handleReminderUpdate}
                reminder={reminder}
              />
            )
          )}
      </div>
    </div>
  );
};

export default ReminderList;
