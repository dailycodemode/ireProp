import React, { useState, useEffect } from "react";
import apiTodo from "./api/toDos";

const ToDos = (props) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const resp = apiTodo
      .get(
        "todos"
      )
      .then((resp) => {
        setTodos(resp.data);
        // console.log(todos);
        console.log(resp.data);
      })
      .catch((err) => {
        console.error("err for some reason");
      });
  }, []);

  const todoList = todos.map((todo) => {
    return <li key={todo.todoId}>{todo.title}</li>;
  });

  return <ul>{todoList}</ul>;
};

export default ToDos;