const API_URL = 'http://localhost:5000/api';

export const taskService = {
    // Get all tasks
    getTasks: async () => {
        const res = await fetch(`${API_URL}/tasks`);
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to fetch tasks');
        }
        return res.json();
    },

    // Get task by id
    getTaskById: async (id) => {
        const res = await fetch(`${API_URL}/tasks/${id}`);
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to fetch task');
        }
        return res.json();
    },

    // Create a new task
    createTask: async (taskData) => {
        const res = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to create task');
        }
        return res.json();
    },

    // Update an existing task
    updateTask: async (id, taskData) => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to update task');
        }
        return res.json();
    },

    // Delete a task
    deleteTask: async (id) => {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to delete task');
        }
        return true;
    },
};
