import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todos`);
    return response.data.slice(0, 20).map(todo => ({
      id: todo.id,
      title: todo.title,
      description: 'Sample description',
      status: 'To Do'
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};