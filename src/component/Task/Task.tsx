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
    newEventDescription: string,
    newStatusValue: boolean,
    newDueDate: string
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            event: newEventValue,
            description: newEventDescription,
            finished: newStatusValue,
            duedate: newDueDate,
          }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(
      "jsonData",
      JSON.stringify({ ...jsonData, tasks: updatedTasks })
    );
  };

  const addTask = () => {
    // Generate a new task with default values
    const newTask = {
      id: String(Date.now()), // Generate a unique ID (should possibly be updated in the future)
      event: "",
      description: "",
      finished: false,
      duedate: "", // You can add a default due date here
    };
    // Add the new task to the existing tasks
    const updatedTasks = [...tasks, newTask];
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
                handleStatusChange(
                  item.id,
                  e.target.value,
                  item.description,
                  item.finished,
                  item.duedate
                )
              }
            />
          </p>
          <div className="tasklist__details">
            <p className="tasklist__duedate">
              <label>Due date: </label>
              <input
                type="date"
                value={item.duedate}
                onChange={(e) =>
                  handleStatusChange(
                    item.id,
                    item.event,
                    item.description,
                    item.finished,
                    e.target.value
                  )
                }
              />
            </p>
            <p className="tasklist__status">
              <label>Status: </label>
              <select
                value={item.finished ? "Done" : "In Progress"}
                onChange={(e) =>
                  handleStatusChange(
                    item.id,
                    item.event,
                    item.description,
                    e.target.value === "Done",
                    item.duedate
                  )
                }
              >
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </p>
          </div>
          <p className="tasklist__description">
            <textarea
              value={item.description}
              onChange={(e) =>
                handleStatusChange(
                  item.id,
                  item.event,
                  e.target.value,
                  item.finished,
                  item.duedate
                )
              }
            ></textarea>
          </p>
        </div>
      ))}
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default Task;
