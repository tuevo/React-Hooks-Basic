import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TodoForm.style.scss";

TodoForm.propTypes = {
  onSubmitTodoForm: PropTypes.func
};

TodoForm.defaultProps = {
  onSubmitTodoForm: null
};

function TodoForm(props) {
  const { onSubmitTodoForm } = props;
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!(onSubmitTodoForm && value)) return;

    const formValues = {
      title: value
    };

    onSubmitTodoForm(formValues);
    setValue("");
  }

  function onInputChange(e) {
    setValue(e.target.value);
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={onInputChange}
        placeholder="What are you gonna do?"
      />
      <button type="submit">ADD</button>
    </form>
  );
}

export default TodoForm;
