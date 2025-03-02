import React, { useState } from "react";
import "./style.css";
import AddTodo from "./AddTodo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetTodos() {
  return useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8080/tasks");
      return response;
    },
  });
}

const TodoPage = () => {
  const [todo, setTodo] = useState([]);
  const { isLoading, data, error, isError, isSuccess } = useGetTodos();

  if (isLoading) {
    return <div className="Сontainer text-primary text-2xl">Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(todo);
  return (
    isSuccess && (
      <div className="Сontainer">
        <AddTodo setTodo={setTodo} />
      </div>
    )
  );
};

export default TodoPage;
