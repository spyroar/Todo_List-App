import React, { useState } from 'react';
import { STATUS_OPTIONS } from '../utils/constants';

const AddTaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To Do'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title && task.description) {
      onAddTask(task);
      setTask({ title: '', description: '', status: 'To Do' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        required
      />
      <select
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
      >
        {STATUS_OPTIONS.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;