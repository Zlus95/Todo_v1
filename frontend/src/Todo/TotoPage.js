import React, { useState } from "react";
import "./style.css";
import AddTodo from "./AddTodo";

const TodoPage = () => {
  const [todo, setTodo] = useState([]);
  console.log(todo);
  return (
    <div className="Сontainer">
      <AddTodo setTodo={setTodo} />
    </div>
  );
};

export default TodoPage;
