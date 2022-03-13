import React from "react";

const TodoForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex mt-5">
        <input
          type={"text"}
          placeholder="Add Todo"
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
