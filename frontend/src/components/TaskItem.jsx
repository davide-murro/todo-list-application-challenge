import { useState } from 'react';

/**
 * TaskItem Component (Display Only)
 * 
 * @param {Object} task - The task object containing title and description
 * @param {Function} onDelete - Callback to delete the task
 * @param {Function} onToggle - Callback to toggle completion
 * @param {Function} onEdit - Callback to start editing
 */
function TaskItem({ task, onDelete, onToggle, onEdit }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleToggle = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            await onToggle(task.id);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            await onDelete(task.id);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="task-item">
            <div className="task-content-wrapper">
                <input
                    type="checkbox"
                    className="checkbox-custom"
                    checked={!!task.is_completed}
                    onChange={handleToggle}
                    disabled={isProcessing}
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
                <button className="secondary" onClick={() => onEdit(task)} disabled={isProcessing}>
                    Edit
                </button>
                <button className="danger" onClick={handleDelete} disabled={isProcessing}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
