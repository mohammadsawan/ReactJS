import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, handleCheck, handleDelete }) => {
  return (
    <div className="mt-5">
      {todos.length ? (
        <ul className="d-flex flex-column">
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>
      ) : (
        <h2 className="text-center text-muted my-auto">No Todos!</h2>
      )}
    </div>
  );
};

export default TodoList;
