import Task from "../Task/Task";

const TaskList = ({ jsonData }) => {
  return (
    <div className="tasklist">{jsonData && <Task jsonData={jsonData} />}</div>
  );
};

export default TaskList;
