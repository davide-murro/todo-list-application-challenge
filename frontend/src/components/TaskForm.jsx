import { useState, useEffect } from 'react';

/**
 * TaskForm Component
 * 
 * @param {Function} onSubmit - Callback function to handle the task data
 * @param {Object} initialData - Optional data for editing
 * @param {Function} onCancel - Optional callback to cancel editing
 */
function TaskForm({ onSubmit, initialData = null, onCancel = null }) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onSubmit({ title, description });
            if (!initialData) {
                setTitle('');
                setDescription('');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-card">
            <h3>{initialData ? 'Edit Task' : 'Add New Task'}</h3>
            <form onSubmit={handleSubmit} className="input-group">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                />
                <div className="button-row">
                    <button type="submit" disabled={isSubmitting}>
                        {initialData ? 'Update Task' : 'Add Task'}
                    </button>
                    {onCancel && (
                        <button type="button" onClick={onCancel} className="secondary" disabled={isSubmitting}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default TaskForm;
