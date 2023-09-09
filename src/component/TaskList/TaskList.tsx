import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

import Task from "../Task/Task";

interface TaskListProps {
  jsonData: any;
}

const TaskList: React.FC<TaskListProps> = ({ jsonData }) => {
  const statusOptions = ["Idea", "Open", "In Progress", "Done"];
  const [tasks, setTasks] = useState(jsonData.tasks);
  const [showStates, setShowStates] = useState(jsonData.tasks.map(() => false));

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
      JSON.stringify({ ...jsonData, tasks: [...tasks, newTask] })
    );
  };

  const handleTaskUpdate = (taskId: string, updatedTask: any) => {
    const updatedTasks = tasks.map((task: { id: string }) =>
      task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);

    localStorage.setItem(
      "jsonData",
      JSON.stringify({ ...jsonData, tasks: updatedTasks })
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
      JSON.stringify({ ...jsonData, tasks: updatedTasks })
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
        className="tasklist__button tasklist__button--newTask"
        onClick={handleAddTask}
      >
        <FontAwesomeIcon icon={faSquarePlus} /> Add Task
      </button>
    </div>
  );
};

export default TaskList;
