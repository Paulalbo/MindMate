import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

interface TaskProps {
  task: any;
  onUpdate: (taskId: string, updatedTask: any) => void;
  onDelete: (taskId: string) => void;
}

const statusOptions = ["Idea", "Open", "In Progress", "Done"];

const Task: React.FC<TaskProps> = ({ task, onUpdate, onDelete }) => {
  const handleStatusChange = (
    newEventValue: string,
    newEventDescription: string,
    newStatusValue: string,
    newDueDate: string
  ) => {
    onUpdate(task.id, {
      ...task,
      event: newEventValue,
      description: newEventDescription,
      status: newStatusValue,
      duedate: newDueDate,
    });
  };

  return (
    <div className="tasklist__item">
      <p className="tasklist__title">
        <input
          type="text"
          value={task.event}
          onChange={(e) =>
            handleStatusChange(
              e.target.value,
              task.description,
              task.status,
              task.duedate
            )
          }
        />
      </p>
      <div className="tasklist__details">
        <p className="tasklist__duedate">
          <label>Due date: </label>
          <input
            type="date"
            value={task.duedate}
            onChange={(e) =>
              handleStatusChange(
                task.event,
                task.description,
                task.status,
                e.target.value
              )
            }
          />
        </p>
        <p className="tasklist__status">
          <label>Status: </label>
          <select
            value={task.status}
            onChange={(e) =>
              handleStatusChange(
                task.event,
                task.description,
                e.target.value,
                task.duedate
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
          value={task.description}
          onChange={(e) =>
            handleStatusChange(
              task.event,
              e.target.value,
              task.status,
              task.duedate
            )
          }
        ></textarea>
      </p>
      <button
        className="button tasklist__button tasklist__button--delete"
        onClick={() => onDelete(task.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button className="button tasklist__button">
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </div>
  );
};

export default Task;
