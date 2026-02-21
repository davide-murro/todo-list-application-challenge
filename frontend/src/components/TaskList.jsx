import TaskItem from './TaskItem';

/**
 * TaskList Component (Simple Display)
 * 
 * @param {Array} tasks - The array of task objects to display
 * @param {Function} onDelete - Callback to delete a task
 * @param {Function} onToggle - Callback to toggle task completion
 */
function TaskList({ tasks, onDelete, onToggle }) {
    if (tasks.length === 0) {
        return (
            <div>
                <p>Your list is empty. Add your first task!</p>
            </div>
        );
    }

    return (
        <div className="task-list-rendering">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </div>
    );
}

export default TaskList;
