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
        <div className="task-item">
            <div className="task-content-wrapper">
                <input
                    type="checkbox"
                    className="checkbox-custom"
                    checked={!!task.is_completed}
                    onChange={() => onToggle(task.id)}
                />
                <div className="task-info">
                    <strong>
                        {task.title}
                    </strong>
                    {task.description && (
                        <p>{task.description}</p>
                    )}
                </div>
            </div>
            <div className="task-actions">
                <button className="secondary" onClick={() => onEdit(task)}>
                    Edit
                </button>
                <button className="danger" onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
