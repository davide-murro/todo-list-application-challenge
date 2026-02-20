import TaskItem from './TaskItem';

/**
 * TaskList Component (Simple Display)
 * 
 * @param {Array} tasks - The array of task objects to display
 */
function TaskList({ tasks }) {
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
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}

export default TaskList;
