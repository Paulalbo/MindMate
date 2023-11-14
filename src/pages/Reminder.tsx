import { useState, Key } from "react";
import ReminderTask from "../component/ReminderTask/ReminderTask";

const ReminderList = () => {
  const jsonData = localStorage.getItem("mindMateData");
  const initialData = jsonData ? JSON.parse(jsonData) : { Reminders: [] };

  const [reminders, setReminders] = useState(
    Array.isArray(initialData.Reminders) ? initialData.Reminders : []
  );

  const handleAddReminder = () => {
    const newReminder = {
      id: String(Date.now()),
      title: "",
      status: false,
    };

    setReminders((prevReminders: any) => [...prevReminders, newReminder]);

    const updatedData = {
      ...initialData,
      Reminders: Array.isArray(initialData.Reminders)
        ? [...initialData.Reminders, newReminder]
        : [newReminder],
    };

    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
  };

  const handleReminderDelete = (reminderId: any) => {
    const updatedReminders = reminders.filter(
      (reminder: { id: any }) => reminder.id !== reminderId
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

  const handleReminderUpdate = (reminderId: any, updatedReminder: any) => {
    const updatedReminders = reminders.map((reminder: { id: any }) =>
      reminder.id === reminderId ? updatedReminder : reminder
    );
    setReminders(updatedReminders);

    const updatedData = {
      ...initialData,
      Reminders: Array.isArray(initialData.Reminders)
        ? updatedReminders
        : [updatedReminder],
    };

    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
  };

  return (
    <div>
      <h1>
        RE<b>MIND</b>ER
      </h1>
      <p>set yourself some reminder and take a break</p>
      <button className="button" onClick={handleAddReminder}>
        Add Reminder
      </button>
      <div className="reminder__wrapper">
        {reminders &&
          reminders.map((reminder: { id: Key | null | undefined }) => (
            <ReminderTask
              key={reminder.id}
              onUpdate={handleReminderUpdate}
              reminder={reminder}
              onDelete={handleReminderDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default ReminderList;
