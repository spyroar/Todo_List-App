Live Deployment Link - https://todo-list-app-beryl-six.vercel.app/

1. How did you handle inline editing in the table?
Answer :-   Inline Editing Implementation The inline editing is handled through Tabulator's built-in editor functionality in the column   definitions:
  In TableConfig.js
{
  title: "Title",
  field: "title",
  editor: "input",  // Enables inline editing
  validator: ["required", "string"]  // Validates input
}


2. Explain how you fetched and processed the data from the dummy API.
 Answer:-   Data Fetching and Processing Data fetching is handled in the useTodoData hook using axios:
           // In hooks/useTodoData.js
export const useTodoData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const todos = await fetchTodos();
        setData(todos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  // ...
};
The data is processed in the API utility:
// In utils/api.js
export const fetchTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`);
  return response.data.slice(0, 20).map(todo => ({
    id: todo.id,
    title: todo.title,
    description: 'Sample description',
    status: 'To Do'
  }));
};


3. What approach did you use to filter tasks based on status?
Answer :- Status-based Filtering Filtering is implemented using Tabulator's filtering API in the useTableData hook:
          // In useTableData.js
const handleFilterByStatus = useCallback((status) => {
  if (!tabulatorRef.current) return;

  if (status) {
    tabulatorRef.current.setFilter('status', '=', status);
  } else {
    tabulatorRef.current.clearFilter();
  }
}, []);

4. How did you manage the state of tasks when adding or editing them?
Answer :- Task State Management Task state is managed through a combination of Tabulator's internal state and React state:
        // In useTableData.js
const [tasks, setTasks] = useState([]);

const updateTasks = useCallback(() => {
  if (tabulatorRef.current) {
    setTasks(tabulatorRef.current.getData());
  }
}, []);

const handleAddTask = useCallback((newTask) => {
  const taskWithId = {
    ...newTask,
    id: getNextId()
  };
  tabulatorRef.current?.addRow(taskWithId);
  updateTasks();
}, [updateTasks]);

5. What challenges did you face during development, and how did you overcome them?
Answer : -Development Challenges and Solutions
a. Challenge: Managing synchronization between Tabulator and React state
Solution: Created a dedicated updateTasks function that syncs Tabulator's data with React state after every operation.

b. Challenge: Handling complex filtering logic
Solution: Implemented separate filter handlers for status and search, using Tabulator's advanced filtering capabilities:

const handleSearch = useCallback((searchTerm) => {
  if (!tabulatorRef.current) return;

  if (searchTerm) {
    tabulatorRef.current.setFilter([
      [
        { field: 'title', type: 'like', value: searchTerm },
        { field: 'description', type: 'like', value: searchTerm }
      ]
    ]);
  } else {
    tabulatorRef.current.clearFilter();
  }
}, []);

c. Challenge: Maintaining clean component structure
Solution: Separated concerns into multiple hooks and components:

useTableData for data operations
useTableInitialization for table setup
Separate components for SearchBar, TaskCounters, etc.
The code follows best practices by:

Using custom hooks for logic separation
Implementing proper error handling
Maintaining consistent state updates
Using memoization with useCallback
Following the single responsibility principle


