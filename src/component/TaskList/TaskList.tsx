import React from "react";
import Task from "../Task/Task";

interface TaskListProps {
  jsonData: any;
}

const TaskList: React.FC<TaskListProps> = ({ jsonData }) => {
  return (
    <div className="tasklist">{jsonData && <Task jsonData={jsonData} />}</div>
  );
};

export default TaskList;
