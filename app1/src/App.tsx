import React, { useState, useEffect } from 'react';
import './index.scss';

const App1: React.FC = () => {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean; priority: string; deadline: string }[]>([]);
  const [taskText, setTaskText] = useState<string>('');
  const [taskPriority, setTaskPriority] = useState<string>('Low');
  const [taskDeadline, setTaskDeadline] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [editableIndex, setEditableIndex] = useState<number | null>(null);

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([
        ...tasks,
        { text: taskText, completed: false, priority: taskPriority, deadline: taskDeadline },
      ]);
      setTaskText('');
      setTaskPriority('Low');
      setTaskDeadline('');
    }
  };

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'active':
        return !task.completed;
      default:
        return true;
    }
  });

  const taskCount = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    active: tasks.filter((task) => !task.completed).length,
  };

  const editTask = (index: number, newText: string, newPriority: string, newDeadline: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    updatedTasks[index].priority = newPriority;
    updatedTasks[index].deadline = newDeadline;
    setTasks(updatedTasks);
    setEditableIndex(null);
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
        <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={taskDeadline}
          onChange={(e) => setTaskDeadline(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={() => setFilter('active')}>Active</button>
        </div>
        <button onClick={clearCompletedTasks}>Clear Completed</button>
        <p>
          Total tasks: {taskCount.total} | Completed: {taskCount.completed} | Active: {taskCount.active}
        </p>
        <ul className="todo-list">
          {filteredTasks.map((task, index) => (
            <li className={`todo-item ${task.completed ? 'completed' : ''}`} key={index}>
              {editableIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <select
                    value={task.priority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <input
                    type="date"
                    value={task.deadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                  />
                </div>
              ) : (
                <div onClick={() => setEditableIndex(index)}>
                  <span>{task.text}</span>
                  <span>Priority: {task.priority}</span>
                  <span>Deadline: {task.deadline}</span>
                </div>
              )}
              <div>
                <button onClick={() => toggleComplete(index)}>
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={() => removeTask(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App1;
