useEffect(() => {
  // get clock and check every minute if time of active reminders are due

  // Check for past or current reminders and show alerts
  reminders.forEach(
    (reminder: { date: string | number | Date; status: any; title: any }) => {
      const reminderDate = new Date(reminder.date);
      const currentDate = new Date();

      if (reminderDate <= currentDate && reminder.status) {
        showAlert(`Reminder: ${reminder.title}`);
      }
    }
  );
}, [reminders]);

const showAlert = (message: string) => {
  alert(message);
};
