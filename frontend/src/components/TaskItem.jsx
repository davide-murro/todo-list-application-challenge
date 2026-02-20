/**
 * TaskItem Component (Display Only)
 * 
 * @param {Object} task - The task object containing title and description
 */
function TaskItem({ task }) {
    return (
        <div>
            <h3>{task.title}</h3>
            {task.description && (
                <p>{task.description}</p>
            )}
        </div>
    );
}

export default TaskItem;
