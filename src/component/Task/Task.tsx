import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

interface TaskProps {
  jsonData: any; // Use a specific type if you have one for your JSON data
}

const Task: React.FC<TaskProps> = ({ jsonData }) => {
  const [tasks, setTasks] = useState(jsonData.tasks);
  const [showStates, setShowStates] = useState(
    jsonData.tasks.map(() => false) // Initialize showStates with all false values
  );

  // Define an array of status options
  const statusOptions = ["Idea", "Open", "In Progress", "Done"]; // Add your additional statuses here

  const handleStatusChange = (
    taskId: string,
    newEventValue: string,
    newEventDescription: string,
    newStatusValue: string,
    newDueDate: string
  ) => {
    const updatedTasks = tasks.map((task: { id: string }) =>
      task.id === taskId
        ? {
            ...task,
            event: newEventValue,
            description: newEventDescription,
            status: newStatusValue,
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
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    const newTask = {
      id: String(Date.now()), // Generate a unique ID (should possibly be updated in the future)
      event: "",
      description: "",
      status: "Open", // Set a default status
      duedate: formattedDate, // Set the default due date to the current date
    };

    // Add the new task to the existing tasks
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Add a new show state for the new task
    setShowStates([...showStates, false]);

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
      // Initialize showStates with all false values for each task
      setShowStates(parsedData.tasks.map(() => false));
    }
  }, []);

  return (
    <>
      <div className="tasklist__container">
        {tasks.map((item: any, index: number) => (
          <div
            className={
              showStates[index]
                ? "tasklist__item tasklist__item--show"
                : "tasklist__item"
            }
            key={item.id}
          >
            <p className="tasklist__title">
              <input
                type="text"
                value={item.event}
                onChange={(e) =>
                  handleStatusChange(
                    item.id,
                    e.target.value,
                    item.description,
                    item.status,
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
                      item.status,
                      e.target.value
                    )
                  }
                />
              </p>
              <p className="tasklist__status">
                <label>Status: </label>
                <select
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChange(
                      item.id,
                      item.event,
                      item.description,
                      e.target.value,
                      item.duedate
                    )
                  }
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
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
                    item.status,
                    item.duedate
                  )
                }
              ></textarea>
            </p>
            <button
              className="tasklist__button"
              onClick={() =>
                setShowStates((prev: string[]) => [
                  ...prev.slice(0, index),
                  !prev[index],
                  ...prev.slice(index + 1),
                ])
              }
            >
              {showStates[index] ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faPenToSquare} />
              )}
            </button>
          </div>
        ))}
      </div>
      <button
        className="tasklist__button tasklist__button--newTask"
        onClick={addTask}
      >
        <FontAwesomeIcon icon={faSquarePlus} /> Add Task
      </button>
    </>
  );
};

export default Task;
