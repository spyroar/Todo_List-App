import React, { useState } from 'react';
import { useTableInitialization } from './useTableInitialization';
import { useTodoData } from '../../hooks/useTodoData';
import { getNextId } from '../../utils/idManager';
import AddTaskForm from '../AddTaskForm';
import StatusFilter from '../StatusFilter';
import "tabulator-tables/dist/css/tabulator.min.css";

const TodoTable = () => {
  const { data, loading, error } = useTodoData();
  const { tableRef, tabulatorRef } = useTableInitialization(data);
  const [currentFilter, setCurrentFilter] = useState("");

  const handleAddTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: getNextId()
    };
    tabulatorRef.current?.addRow(taskWithId);
  };

  const handleFilterChange = (status) => {
    setCurrentFilter(status);
    if (tabulatorRef.current) {
      if (status) {
        tabulatorRef.current.setFilter("status", "=", status);
      } else {
        tabulatorRef.current.clearFilter();
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="controls">
        <AddTaskForm onAddTask={handleAddTask} />
        <StatusFilter onFilterChange={handleFilterChange} />
      </div>
      <div ref={tableRef}></div>
    </div>
  );
};

export default TodoTable;