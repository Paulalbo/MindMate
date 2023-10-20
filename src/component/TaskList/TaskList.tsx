import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

import Task from "../Task/Task";

const TaskList = () => {
  const statusOptions = ["Idea", "Open", "In Progress", "Done"];
  let jsonData = localStorage.getItem("jsonData");
  const storedData = jsonData ? JSON.parse(jsonData) : { tasks: [] };

  const [tasks, setTasks] = useState(storedData.tasks);
  const [showStates, setShowStates] = useState(
    storedData.tasks.map(() => false)
  );

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
    setShowStates((prevStates: any) => [...prevStates, false]);

    localStorage.setItem(
      "jsonData",
      JSON.stringify({ ...storedData, tasks: [...tasks, newTask] })
    );
  };

  const handleTaskUpdate = (taskId: string, updatedTask: any) => {
    const updatedTasks = tasks.map((task: { id: string }) =>
      task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);

    localStorage.setItem(
      "jsonData",
      JSON.stringify({ ...storedData, tasks: updatedTasks })
    );
  };

  const handleToggleShow = (index: number) => {
    setShowStates((prevStates: any) => {
      const newState = [...prevStates];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(
      (task: { id: string }) => task.id !== taskId
    );
    setTasks(updatedTasks);

    localStorage.setItem(
      "jsonData",
      JSON.stringify({ ...storedData, tasks: updatedTasks })
    );
  };

  return (
    <div className="tasklist">
      {statusOptions.map((status) => (
        <div key={status} className={`tasklist--${status.toLowerCase()}`}>
          <h2>{status}</h2>
          {tasks
            .filter((task: { status: string }) => task.status === status)
            .map(
              (task: { id: React.Key | null | undefined }, index: number) => (
                <Task
                  key={task.id}
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onToggleShow={() => handleToggleShow(index)}
                  onDelete={handleDeleteTask}
                  show={showStates[index]}
                />
              )
            )}
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
