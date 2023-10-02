import React, { useState, useEffect } from 'react';

const App1: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskText, setTaskText] = useState<string>('');

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, taskText]);
      setTaskText('');
    }
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    document.title = 'To-Do List App';
  }, []);

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="todo-container">
        <input
          type="text"
          placeholder="Add a task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li className="todo-item" key={index}>
              <span>{task}</span>
              <button onClick={() => removeTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App1;
