import PropTypes from "prop-types";
import React from "react";
import "./TodoList.style.scss";

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func
};

TodoList.defaultProps = {
  todoList: [],
  onTodoClick: null
};

function TodoList(props) {
  const { todoList, onTodoClick } = props;

  function handleClick(todo) {
    if (onTodoClick) {
      onTodoClick(todo);
    }
  }

  return (
    <div className="todo-list">
      {todoList.length > 0 ? (
        <ul className="todo-list__list">
          {todoList.map((todo, index) => (
            <li key={index} onClick={() => handleClick(todo)} className="animated fadeInRight" style={{ animationDelay: `${index * 0.4}s` }}>
              {todo.title}
            </li>
          ))}
        </ul>
      ) : (
          <div className="todo-list__empty">Empty list</div>
        )}
    </div>
  );
}

export default TodoList;
