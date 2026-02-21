require('dotenv').config();
const express = require('express');
const cors = require('cors');

const Task = require('./models/Task');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/tasks', taskRoutes);

// Database Sync and Server Listen
const startServer = async () => {
    try {
        console.log('Synchronizing database...');
        // Sync models - creates the table if it doesn't exist
        await Task.sync();
        console.log('Database synchronized successfully.');

        app.listen(PORT, HOST, () => {
            console.log(`Server is running on http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
        process.exit(1);
    }
};

startServer();
