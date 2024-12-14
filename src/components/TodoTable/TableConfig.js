import { STATUS_OPTIONS } from '../../utils/constants';

export const getTableColumns = (onDelete) => [
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
        onDelete(cell.getRow());
      }
    },
    width: 100,
    hozAlign: "center"
  }
];