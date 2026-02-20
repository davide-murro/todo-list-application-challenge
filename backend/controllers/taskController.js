const Task = require('../models/Task');

const taskController = {
    // Get all tasks
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.getAll();
            res.json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Get task by ID
    getTaskById: async (req, res) => {
        try {
            const task = await Task.getById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            console.error('Error fetching task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Create a new task
    createTask: async (req, res) => {
        try {
            const { title, description } = req.body;
            if (!title) {
                return res.status(400).json({ message: 'Title is required' });
            }
            const newTask = await Task.create({ title, description });
            res.status(201).json(newTask);
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(400).json({ message: error.message || 'Error creating task' });
        }
    },

    // Update a task
    updateTask: async (req, res) => {
        try {
            const { title, description, is_completed } = req.body;
            const updatedTask = await Task.update(req.params.id, { title, description, is_completed });
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(400).json({ message: error.message || 'Error updating task' });
        }
    },

    // Delete a task
    deleteTask: async (req, res) => {
        try {
            const success = await Task.delete(req.params.id);
            if (!success) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = taskController;
