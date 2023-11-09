import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faAlignJustify,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import Task from "../Task/Task";

const TaskList = () => {
  const statusOptions = ["Idea", "Open", "In Progress", "Done"];

  // Use the local storage only for initial data retrieval, not for ongoing state management.
  const jsonData = localStorage.getItem("mindMateData");
  const initialData = jsonData ? JSON.parse(jsonData) : { tasks: [] };

  const [tasks, setTasks] = useState(initialData.tasks);

  let currentTaskID = new URLSearchParams(window.location.search).get("task");
  const getSelectedTask = () => {
    const jsonData = localStorage.getItem("mindMateData");
    const storedTasks = jsonData ? JSON.parse(jsonData) : { tasks: [] };
    if (storedTasks.tasks) {
      return storedTasks.tasks.find(
        (task: { id: string }) => task.id === currentTaskID
      );
    }
  };
  const selectedTask = getSelectedTask();

  const handleAddTask = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    const newTask = {
      id: String(Date.now()),
      event: "",
      description: "",
      status: "Open",
      duedate: formattedDate,
    };

    setTasks((prevTasks: any) => [...prevTasks, newTask]);

    // Update only the "tasks" part of the JSON data.
    const updatedData = {
      ...initialData,
      tasks: [...initialData.tasks, newTask],
    };

    // Update localStorage with the updated data.
    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
    window.location.href = "?task=" + newTask.id;
  };

  const handleTaskUpdate = (taskId: any, updatedTask: any) => {
    const updatedTasks = tasks.map((task: { id: any }) =>
      task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);

    // Update only the "tasks" part of the JSON data.
    const updatedData = {
      ...initialData,
      tasks: updatedTasks,
    };

    // Update localStorage with the updated data.
    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
  };

  const handleDeleteTask = (taskId: any) => {
    const updatedTasks = tasks.filter(
      (task: { id: any }) => task.id !== taskId
    );
    setTasks(updatedTasks);

    // Update only the "tasks" part of the JSON data.
    const updatedData = {
      ...initialData,
      tasks: updatedTasks,
    };

    // Update localStorage with the updated data.
    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
  };

  const closeModal = () => {
    window.location.href = "./task-page";
  };

  // Use useEffect to update localStorage whenever tasks change.
  useEffect(() => {
    // Update only the "tasks" part of the JSON data.
    const updatedData = {
      ...initialData,
      tasks,
    };

    localStorage.setItem("mindMateData", JSON.stringify(updatedData));
  }, [tasks]);

  return (
    <div className="tasklist">
      {selectedTask && (
        <div className="tasklist__modal">
          <div className="tasklist__modal-form">
            <button
              className="button tasklist__modal-close"
              onClick={closeModal}
            >
              X
            </button>
            <label htmlFor="task-modal-title">
              <FontAwesomeIcon icon={faPen} /> Task Name
            </label>
            <input
              id="task-modal-title"
              className="tasklist__modal-title"
              type="text"
              value={selectedTask.event}
            ></input>
            <label htmlFor="task-modal-description">
              <FontAwesomeIcon icon={faAlignJustify} /> Description
            </label>
            <textarea
              id="task-modal-description"
              className="tasklist__modal-description"
              value={selectedTask.description}
            ></textarea>
            <div className="tasklist__modal-details">
              <select
                className="tasklist__modal-status"
                value={selectedTask.status}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                className="tasklist__modal-date"
                type="date"
                value={selectedTask.duedate}
              ></input>
            </div>
          </div>
        </div>
      )}
      {statusOptions.map((status) => (
        <div key={status} className={`tasklist--${status.toLowerCase()}`}>
          <h2>{status}</h2>
          {tasks &&
            tasks
              .filter((task: { status: string }) => task.status === status)
              .map((task: { id: React.Key | null | undefined }) => (
                <Task
                  key={task.id}
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleDeleteTask}
                />
              ))}
        </div>
      ))}
      <button
        className="button tasklist__button tasklist__button--newTask"
        onClick={handleAddTask}
      >
        <FontAwesomeIcon icon={faSquarePlus} /> Add Task
      </button>
    </div>
  );
};

export default TaskList;
