import cn from 'classnames';
import { Task } from '../../types/task';
import './TaskItem.scss';
import { Status } from '../../types/status';
import { removeTask, setEdit } from '../../features/tasks/tasksSlicer';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  task: Task;
  setIsOpen: (boo: boolean) => void;
};

export const TaskItem :React.FC<Props> = ({ task, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(state => state.tasks);
  const {
    id,
    title,
    date,
    status,
  } = task;

  const normalizedStatus = status[0].toUpperCase() + status.slice(1)
    .split('-').join(' ');

  const handleDelete = (idToDelete: number) => {
    dispatch(removeTask(idToDelete));

    localStorage.setItem('tasks',
      JSON.stringify([...tasks
        .filter(ts => ts.id !== idToDelete)]));

    setIsOpen(false);
  };

  const handleEdit = () => {
    setIsOpen(true);
    dispatch(setEdit(task));
  };

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>{date}</td>
      <td>
        <div
          className={cn('table-row-status', {
            'table-row-status--not-started': status === Status.NotStarted,
            'table-row-status--in-progress': status === Status.InProgress,
            'table-row-status--completed': status === Status.Completed,
          })}
        >
          {normalizedStatus}
        </div>
      </td>
      <td>
        <div className="table-row__buttons">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
