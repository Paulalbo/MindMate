import React, { useState, useEffect } from "react";
import "./style.css";

interface TaskProps {
  jsonData: any; // Use a specific type if you have one for your JSON data
}

const Task: React.FC<TaskProps> = ({ jsonData }) => {
  const [tasks, setTasks] = useState(jsonData.tasks);

  const handleStatusChange = (
    taskId: string,
    newEventValue: string,
    newFinishedValue: boolean
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, event: newEventValue, finished: newFinishedValue }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(
      "jsonData",
      JSON.stringify({ ...jsonData, tasks: updatedTasks })
    );
  };

  useEffect(() => {
    const storedData = localStorage.getItem("jsonData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setTasks(parsedData.tasks);
    }
  }, []);

  return (
    <div className="tasklist__container">
      {tasks.map((item) => (
        <div className="tasklist__item" key={item.id}>
          <p className="tasklist__title">
            <input
              type="text"
              value={item.event}
              onChange={(e) =>
                handleStatusChange(item.id, e.target.value, item.finished)
              }
            />
          </p>
          <p className="tasklist__status">
            <input
              type="checkbox"
              checked={item.finished}
              onChange={(e) =>
                handleStatusChange(item.id, item.event, e.target.checked)
              }
            />
            {item.finished ? "Done" : "In progress"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Task;
