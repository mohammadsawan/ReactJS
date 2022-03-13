import React from "react";

const Todo = ({ todo, handleCheck, handleDelete }) => {
  return (
    <li className="rounded d-flex justify-content-center align-items-center border border-secondary bg-light mt-2 ps-2">
      <input
        type="checkbox"
        id={todo.id}
        onChange={() => handleCheck(todo.id)}
        checked={todo.checked}
      />
      <label
        htmlFor={todo.id}
        className="my-auto me-auto ms-3 pe-2"
        style={todo.checked ? { textDecoration: "line-through" } : null}
      >
        {todo.title}
      </label>
      <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default Todo;
