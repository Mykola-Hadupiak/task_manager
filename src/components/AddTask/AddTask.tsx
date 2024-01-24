import { useState } from 'react';
import { Status } from '../../types/status';
import './AddTask.scss';
import { Task } from '../../types/task';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTask, updateTask } from '../../features/tasks/tasksSlicer';

type Props = {
  setIsOpen: (boo: boolean) => void;
};

export const AddTask: React.FC<Props> = ({
  setIsOpen,
}) => {
  const dispatch = useAppDispatch();
  const { tasks, taskToEdit } = useAppSelector(state => state.tasks);
  const [query, setQuery] = useState(taskToEdit?.title || '');
  const [date, setDate] = useState(taskToEdit?.date || '');
  const [status, setStatus] = useState(taskToEdit?.status || Status.NotStarted);

  const handleCloseAddTask = () => {
    setIsOpen(false);
  };

  const handleClear = () => {
    setStatus(Status.NotStarted);
    setQuery('');
    setDate('');
  };

  const handleAdd = (task: Task) => {
    dispatch(addTask(task));

    localStorage.setItem('tasks',
      JSON.stringify([...tasks, task]));
  };

  const handleUpdate = (task: Task) => {
    dispatch(updateTask(task));

    const updatedTasks = tasks.map(t => (t.id === task.id ? task : t));

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    if (taskToEdit) {
      const taskToUpdate = {
        id: taskToEdit.id,
        title: query,
        date,
        status,
      };

      handleUpdate(taskToUpdate);
      handleClear();
      setIsOpen(false);
    } else {
      const newId = tasks.length > 0
        ? Math.max(...tasks.map(task => task.id)) + 1
        : 1;

      const task = {
        id: newId,
        title: query,
        date,
        status,
      };

      handleAdd(task);
      handleClear();
      setIsOpen(false);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="add-task">
        <div className="add-task__top">
          <h1 className="title">{taskToEdit ? 'Edit task' : 'Add task'}</h1>
          <button
            onClick={handleCloseAddTask}
            type="button"
            aria-label="close"
            className="btn-close"
          />
        </div>

        <div className="add-task__main">
          <div>
            <p className="add-task__option">
              Task desciption
            </p>

            <div className="input-group mb-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                className="form-control"
                placeholder="Task desciption"
              />
            </div>
          </div>

          <div className="add-task__second-main">
            <div className="add-task__child">
              <p className="add-task__option">
                Date
              </p>

              <input
                type="date"
                className="form-control"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="add-task__child">
              <p className="add-task__option">
                Status
              </p>

              <select
                className="form-select"
                onChange={(e) => setStatus(e.target.value as Status)}
                value={status}
                required
              >
                <option value={Status.NotStarted}>Not started</option>
                <option value={Status.InProgress}>In progress</option>
                <option value={Status.Completed}>Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="add-task__buttom">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
          >
            {taskToEdit ? 'Save changes' : 'Add task'}
          </button>
        </div>
      </div>
    </form>
  );
};
