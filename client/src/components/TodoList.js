import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onAddTodo, onToggleComplete, onDeleteTodo, taskNameError }) => {
    // State to hold the text for a new to-do item
    const [newTodoText, setNewTodoText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Add the new to-do item
        onAddTodo(newTodoText);
        // Clear the input field after submission
        setNewTodoText('');
    };

    return (
        <div className="container todo-list">
            <form onSubmit={handleSubmit} className="form-inline">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTodoText}
                    onChange={(event) => setNewTodoText(event.target.value)}
                    className="form-control m-2"
                />
                {taskNameError && <p style={{ color: 'red', fontSize: 'small' }} className='m-2'>{taskNameError}</p>}

                <button type="submit" className="btn btn-primary m-2">Add</button>
            </form>
            <ul className="list-group">
                {todos?.map((todo) => (
                    <TodoItem // Render TodoItem for each item
                        key={todo.id}
                        todo={todo}
                        onToggleComplete={onToggleComplete} // Pass function for completion toggle
                        onDelete={onDeleteTodo} // Optional: Pass function for deletion
                    />
                ))}
            </ul>

            {todos.length === 0 && <p className='m-2 text-warning'>No to-do items yet.</p>}

        </div>
    );
};

export default TodoList;
