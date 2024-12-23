import React from 'react';

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  // Destructure props with optional chaining (prevents errors)
  const { text = '', completed } = todo || {};  

  // Handle checkbox change
  const handleToggleComplete = () => {
    onToggleComplete(todo._id, todo.text); // Pass the id for completion update
  };

  // Handle delete button click (optional)
  const handleDelete = () => {
    onDelete(todo._id); // Pass the id for deletion
  };

  return (
    <li
    className={`todo-item d-flex justify-content-between align-items-center ${
        completed ? 'completed' : ''
    } mx-2 border-bottom`}
    >
    <div className="form-check my-3">
        <input
        type="checkbox"
        checked={completed}
        onChange={handleToggleComplete}
        className="form-check-input"
        id={todo.text}
        />
        <label className="form-check-label" htmlFor={todo.id}>
        {text}
        </label>
    </div>
    
    {onDelete && (
        <button onClick={handleDelete} className="btn btn-sm btn-outline-danger">
        Delete
        </button>
    )}
    </li>
  );
};

export default TodoItem;
