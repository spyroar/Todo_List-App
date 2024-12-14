import React, { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";
import { fetchTodos } from '../utils/api';
import { STATUS_OPTIONS, TABULATOR_CONFIG } from '../utils/constants';
import { getNextId, setLastId } from '../utils/idManager';
import AddTaskForm from './AddTaskForm';
import StatusFilter from './StatusFilter';

const TodoTable = () => {
  const tableRef = useRef(null);
  const tabulatorRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState("");

  const initializeTable = (data) => {
    // Find the highest ID from initial data to set as last ID
    const maxId = Math.max(...data.map(task => task.id));
    setLastId(maxId);

    if (tableRef.current) {
      tabulatorRef.current = new Tabulator(tableRef.current, {
        ...TABULATOR_CONFIG,
        data,
        columns: [
          { title: "Task ID", field: "id", width: 100 },
          { 
            title: "Title", 
            field: "title", 
            editor: "input",
            validator: ["required", "string"]
          },
          { 
            title: "Description", 
            field: "description", 
            editor: "input",
            validator: ["required", "string"]
          },
          { 
            title: "Status", 
            field: "status", 
            editor: "select",
            editorParams: { values: STATUS_OPTIONS },
            validator: ["required", "string"]
          },
          {
            title: "Actions",
            formatter: () => '<button class="delete-btn">Delete</button>',
            cellClick: (e, cell) => {
              if (e.target.classList.contains('delete-btn')) {
                cell.getRow().delete();
              }
            },
            width: 100,
            hozAlign: "center"
          }
        ]
      });
    }
  };

  const handleAddTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: getNextId()
    };
    tabulatorRef.current.addRow(taskWithId);
  };

  const handleFilterChange = (status) => {
    setCurrentFilter(status);
    if (status) {
      tabulatorRef.current.setFilter("status", "=", status);
    } else {
      tabulatorRef.current.clearFilter();
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTodos();
        initializeTable(data);
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    };

    loadData();

    return () => {
      if (tabulatorRef.current) {
        tabulatorRef.current.destroy();
      }
    };
  }, []);

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