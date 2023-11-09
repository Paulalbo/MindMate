import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faAlignJustify,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

interface TaskProps {
  task: any;
  modal?: boolean;
  onUpdate: (taskId: string, updatedTask: any) => void;
  onDelete: (taskId: string) => void;
}

const statusOptions = ["Idea", "Open", "In Progress", "Done"];

const Task: React.FC<TaskProps> = ({ task, modal, onUpdate, onDelete }) => {
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
    <div
      className={`tasklist__item ` + (modal ? "tasklist__item--modal" : modal)}
    >
      <div className="tasklist__title">
        <label
          className={modal ? "" : "visually-hidden"}
          htmlFor="task-modal-title"
        >
          <FontAwesomeIcon icon={faPen} /> Task Name
        </label>
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
      </div>
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
      {modal && (
        <>
          <label htmlFor="task-modal-description">
            <FontAwesomeIcon icon={faAlignJustify} /> Description
          </label>
          <textarea
            id="task-modal-description"
            className="tasklist__description"
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
        </>
      )}
      {!modal && (
        <>
          <button
            className="button tasklist__button tasklist__button--delete"
            onClick={() => onDelete(task.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            className="button tasklist__button"
            onClick={() => {
              window.location.href = `?task=${task.id}`;
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </>
      )}
    </div>
  );
};

export default Task;
