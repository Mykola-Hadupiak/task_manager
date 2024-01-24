import React, { useState } from 'react';
import './App.scss';
import { useAppSelector } from './app/hooks';
import { TaskList } from './components/TaskList';
import { AddTask } from './components/AddTask/AddTask';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { tasks } = useAppSelector(state => state.tasks);

  const handleOpenAddTask = () => {
    setIsOpen(true);
  };

  return (
    <div className="App">
      <header className="header">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-md">
            <a
              className="navbar-brand"
              href="/"
            >
              Task manager
            </a>
          </div>
        </nav>
      </header>

      <main className="main">
        {isOpen && (
          <AddTask setIsOpen={setIsOpen} />
        )}

        {(!tasks.length && !isOpen) && (
          <div className="first-task">
            <h1 className="title">
              Add your first task
            </h1>
            <button
              type="button"
              className="
                btn
                btn-primary
                first-task__btn
              "
              onClick={handleOpenAddTask}
            >
              Add task
            </button>
          </div>
        )}

        {!!tasks.length && (
          <TaskList setIsOpen={setIsOpen} />
        )}
      </main>
    </div>
  );
};
