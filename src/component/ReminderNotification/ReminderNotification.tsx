import { useState, useEffect, useCallback } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

const ReminderNotification = () => {
  const jsonData = localStorage.getItem("mindMateData");
  const initialData = jsonData ? JSON.parse(jsonData) : { Reminders: [] };

  const [reminders, setReminders] = useState(
    Array.isArray(initialData.Reminders) ? initialData.Reminders : []
  );

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 10000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [notificationVisible, notificationMessage]);

  const checkReminders = () => {
    // Check for past or current reminders and show notifications
    reminders.forEach(
      (reminder: {
        date: string | number | Date;
        status: any;
        title: any;
        id: string;
      }) => {
        const reminderDate = new Date(reminder.date);
        const currentDate = new Date();

        if (reminderDate <= currentDate && reminder.status) {
          showNotification(`Reminder: ${reminder.title}`);
          // Update the reminder status to false after showing the notification
          updateReminderStatus(reminder.id);
        }
      }
    );
  };

  const closeNotification = () => {
    setNotificationVisible(false);
    setNotificationMessage("");
  };

  const showNotification = useCallback((message: string) => {
    setNotificationVisible(true);
    setNotificationMessage(message);
  }, []);

  const updateReminderStatus = (id: string) => {
    // Update the status of the reminder to false
    const updatedReminders = reminders.map((reminder: { id: string }) =>
      reminder.id === id ? { ...reminder, status: false } : reminder
    );

    setReminders(updatedReminders);

    // Update the localStorage with the new reminder status
    const updatedData = { ...initialData, Reminders: updatedReminders };
    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
  };

  return (
    <div
      className={`notification notification--reminder ${
        notificationVisible ? "visible" : ""
      }`}
    >
      <button
        className="notification__close"
        onClick={() => closeNotification()}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <div className="notification__content">
        <h3 className="notification__title">{notificationMessage}</h3>
      </div>
    </div>
  );
};

export default ReminderNotification;
