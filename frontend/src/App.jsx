import { useState, useEffect } from 'react';
import { taskService } from './services/api';
import './App.css';

import TaskList from './components/TaskList';

import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      alert('Error adding task: ' + err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      alert('Error deleting task: ' + err.message);
    }
  };

  const handleToggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const newStatus = !task.is_completed;
      await taskService.updateTask(id, { is_completed: newStatus });
      setTasks(tasks.map(t => t.id === id ? { ...t, is_completed: newStatus } : t));
    } catch (err) {
      alert('Error updating task: ' + err.message);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Todo List Master</h1>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} onToggle={handleToggleTask} />
    </div>
  );
}

export default App
