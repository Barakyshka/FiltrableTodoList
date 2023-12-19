import React from "react";
import "./Todo.css";

const Todo = ({ todo, onDone, onDelete }) => {
  const { id, name, done, createdDate } = todo;
  const handleCheck = () => {
    onDone(!todo.done, todo.id);
  };

  const handleDel = () => {
    onDelete(id);
  };

  console.log(`todo ${name} renders`);

  return (
    <div className="task">
      <div className="task-content">
        <input type="checkbox" checked={done} onChange={handleCheck} />
        <span>{name}</span>
      </div>
      <div className="created-date">
        {new Date(createdDate).toLocaleString()}
      </div>
      <button className="delete-button" onClick={handleDel}>
        Delete
      </button>
    </div>
  );
};

export default React.memo(Todo);
