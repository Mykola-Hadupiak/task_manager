import { useCallback, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TaskItem } from '../TaskItem';
import './TaskList.scss';

type Props = {
  setIsOpen: (boo: boolean) => void;
};

export const TaskList: React.FC<Props> = ({ setIsOpen }) => {
  const { tasks } = useAppSelector(state => state.tasks);
  const [query, setQuery] = useState('');

  const preparingTask = useCallback(() => {
    if (query.trim()) {
      return tasks.filter(task => task.title.toLowerCase()
        .includes(query.trim().toLowerCase()));
    }

    return tasks;
  }, [query, tasks]);

  const tasksToRener = preparingTask();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(false);
  };

  return (
    <div className="task-list">
      <div className="task-list__top">
        <h1 className="title">Task list</h1>
        <div className="task-list__actions">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            className="form-control"
            placeholder="Search"
          />
          <button
            type="button"
            className="
              btn
              btn-primary
              first-task__btn
            "
            onClick={() => setIsOpen(true)}
          >
            Add task
          </button>
        </div>
      </div>
      {tasksToRener.length ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task description</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasksToRener.map(task => (
              <TaskItem
                task={task}
                key={task.id}
                setIsOpen={setIsOpen}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="title">No tasks found</h1>
      )}
    </div>
  );
};
