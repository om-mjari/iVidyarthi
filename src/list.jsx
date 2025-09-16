import React from 'react';
import './list.css';

const List = ({ tasks, onAccept, onReject }) => {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <span className="task-title">
            {task.id}. {task.title} ({task.status})
          </span>
          <div className="task-buttons">
            <button className="done-btn" onClick={() => onAccept(task.id)}>
              Done
            </button>
            <button className="delete-btn" onClick={() => onReject(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default List;
