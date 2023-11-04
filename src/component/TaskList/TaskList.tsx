import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

import Task from "../Task/Task";

const TaskList = () => {
  const statusOptions = ["Idea", "Open", "In Progress", "Done"];

  // Use the local storage only for initial data retrieval, not for ongoing state management.
  const jsonData = localStorage.getItem("mindMateData");
  const initialData = jsonData ? JSON.parse(jsonData) : { tasks: [] };

  const [tasks, setTasks] = useState(initialData.tasks);

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

    // Update localStorage with the new data.
    localStorage.setItem(
      "mindMateData",
      JSON.stringify({ tasks: [...tasks, newTask] })
    );
  };

  const handleTaskUpdate = (taskId: any, updatedTask: any) => {
    const updatedTasks = tasks.map((task: { id: any }) =>
      task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);

    // Update localStorage with the updated data.
    localStorage.setItem(
      "mindMateData",
      JSON.stringify({ tasks: updatedTasks })
    );
  };

  const handleDeleteTask = (taskId: any) => {
    const updatedTasks = tasks.filter(
      (task: { id: any }) => task.id !== taskId
    );
    setTasks(updatedTasks);

    // Update localStorage with the updated data.
    localStorage.setItem(
      "mindMateData",
      JSON.stringify({ tasks: updatedTasks })
    );
  };

  // Use useEffect to update localStorage whenever tasks change.
  useEffect(() => {
    localStorage.setItem("mindMateData", JSON.stringify({ tasks }));
  }, [tasks]);

  return (
    <div className="tasklist">
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
