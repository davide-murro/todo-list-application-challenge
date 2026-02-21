import { useState, useEffect } from 'react';
import { taskService } from './services/api';
import './App.css';

import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
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

  const handleUpdateTask = async (taskData) => {
    try {
      const updated = await taskService.updateTask(editingTask.id, taskData);
      setTasks(tasks.map(t => t.id === updated.id ? updated : t));
      setEditingTask(null);
    } catch (err) {
      alert('Error updating task: ' + err.message);
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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.is_completed;
    if (filter === 'completed') return task.is_completed;
    return true;
  });

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Todo List Master</h1>

      <TaskForm
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        initialData={editingTask}
        onCancel={editingTask ? () => setEditingTask(null) : null}
      />

      <div className="filter-bar">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
        onEdit={(task) => {
          setEditingTask(task);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default App
