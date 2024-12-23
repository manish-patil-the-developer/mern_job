import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList';
import axios from 'axios'; // Import axios for making HTTP requests

const App = () => {
  // State to hold the list of to-do items
  const [todos, setTodos] = useState([]);
  var todoFormdata = new FormData();
  var todoObject = {};
  const [taskNameError, setTaskNameError] = useState('');

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/todos/'); // Replace with your actual backend URL
    setTodos(response.data);
  };

  const addTodosToDb = async (task) => {    
    // Validate the input text (optional)
    if (!task.trim()) {
      setTaskNameError('Please enter task.');
      return; // Prevent adding empty tasks
    }
    
    todoFormdata.append('Task', task);
    todoObject['task'] = task;

  
    const addTodosToDbRequest = await axios.post('http://localhost:5000/todos/', todoFormdata) // Replace with your actual backend URL
    .then(response => {
      console.log('Success');
      setTaskNameError('');
      setTodos([...todos, { id: Date.now(), task, completed: false }]);
    })
    .catch(error => {
      setTaskNameError(error?.response?.data || 'An error occurred while adding the todo');
    })
    .finally(() => {
      fetchTodos();
    });
    todoFormdata = new FormData();
    todoObject = {};
  };

  const markCompleteToDb = async (id, task) => {    
    
    todoFormdata.append('Task', task);
    todoFormdata.append('completed', true);

    const markCompleteToDbRequest = await axios.put('http://localhost:5000/todos/'+id, todoFormdata) // Replace with your actual backend URL
    .then(response => {
      console.log('Completed Successfully.');
      // setTaskNameError('');
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
  
    })
    .catch(error => {
      // setTaskNameError(error?.response?.data || 'An error occurred while adding the todo');
    })
    .finally(() => {
      fetchTodos();
    });

    todoFormdata = new FormData();
  };

  const deleteTaskFromDb = async (id) => {    
    const deleteTaskFromDbRequest = await axios.delete('http://localhost:5000/todos/'+id)
    .then(response => {
      console.log('removed successfully');
      // setTaskNameError('');
      setTodos(todos.filter((todo) => todo.id !== id));  
    })
    .catch(error => {
      // setTaskNameError(error?.response?.data || 'An error occurred while adding the todo');
    })
    .finally(() => {
      fetchTodos();
    });

    todoFormdata = new FormData();
  };
  // Optional: Fetch initial data from backend
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to add a new to-do item
  const addTodo = (task) => {
    addTodosToDb(task);
  };

  // Optional: Function to toggle completion status of a to-do item
  const toggleCompletion = (id, task) => {
    markCompleteToDb(id, task);
  };

  // Optional: Function to delete a to-do item
  const deleteTodo = (id) => {
    deleteTaskFromDb(id);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      {/* Render TodoList only if there are items */}
      
        <TodoList
          todos={todos} // Pass the list of to-do items
          onAddTodo={addTodo} // Pass the function to add a new to-do item
          onToggleComplete={toggleCompletion} // Optional: Pass the function to toggle completion
          onDeleteTodo={deleteTodo} // Optional: Pass the function to delete a to-do item
          taskNameError = {taskNameError}
        />
      
    </div>
  );
  
};

export default App;
