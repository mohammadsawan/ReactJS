import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [value, setValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== Number(id));
    setTodos(newTodos);
  };

  const handleCheck = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === Number(id) ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(newTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodos = todos.concat({
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      checked: false,
      title: e.target[0].value,
    });
    setTodos(newTodos);
    setValue("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <TodoForm handleSubmit={handleSubmit} value={value} setValue={setValue} />
      <TodoList
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        todos={todos}
      />
    </div>
  );
};

export default App;
