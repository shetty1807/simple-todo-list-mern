import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Backend API URL
const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  // State variables
  const [tasks, setTasks] = useState([]); // Store all tasks
  const [newTask, setNewTask] = useState(''); // Store input value
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch all tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Get all tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks. Make sure the server is running.');
    }
  };

  // Create a new task and send to backend
  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Validate input
    if (!newTask.trim()) {
      alert('Please enter a task');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL, { title: newTask });
      setTasks([response.data, ...tasks]); // Add new task to the beginning
      setNewTask(''); // Clear input field
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  // Delete a task from backend and update UI
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id)); // Remove task from state
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  // Toggle task completion status
  const handleToggleComplete = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`);
      // Update the task in the state with new completion status
      setTasks(tasks.map(task => 
        task._id === id ? response.data : task
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
      alert('Failed to update task');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>✨ My Todo List</h1>
          <p className="subtitle">Keep track of your tasks</p>
        </header>

        {/* Add task form */}
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="task-input"
            disabled={loading}
          />
          <button type="submit" className="add-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </form>

        {/* Task list */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>🎉 No tasks yet! Add one to get started.</p>
            </div>
          ) : (
            tasks.map(task => (
              <div key={task._id} className="task-item">
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task._id)}
                    className="task-checkbox"
                  />
                  <span className={`task-title ${task.completed ? 'completed' : ''}`}>
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="delete-button"
                  title="Delete task"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <footer className="footer">
          <p>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total • {tasks.filter(t => t.completed).length} completed</p>
        </footer>
      </div>
    </div>
  );
}

export default App;