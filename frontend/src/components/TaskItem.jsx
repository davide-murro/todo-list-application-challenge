/**
 * TaskItem Component (Display Only)
 * 
 * @param {Object} task - The task object containing title and description
 * @param {Function} onDelete - Callback to delete the task
 * @param {Function} onToggle - Callback to toggle completion
 * @param {Function} onEdit - Callback to start editing
 */
function TaskItem({ task, onDelete, onToggle, onEdit }) {
    return (
        <div>
            <div>
                <input
                    type="checkbox"
                    checked={!!task.is_completed}
                    onChange={() => onToggle(task.id)}
                />
                <div>
                    <h3>{task.title}</h3>
                    {task.description && (
                        <p>{task.description}</p>
                    )}
                </div>
            </div>
            <div>
                <button onClick={() => onEdit(task)}>
                    Edit
                </button>
                <button onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
