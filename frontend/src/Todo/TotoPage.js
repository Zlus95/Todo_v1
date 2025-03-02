import React, { useEffect, useState } from "react";
import "./style.css";
import AddTodo from "./AddTodo";
import { useQuery } from "@tanstack/react-query";
import Todo from "./Todo";
import api from "../api";

function useGetTodos() {
  return useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      const response = await api.get("/tasks");
      return response;
    },
  });
}

const TodoPage = () => {
  const [todo, setTodo] = useState([]);
  const { isLoading, data, error, isError, isSuccess } = useGetTodos();

  useEffect(() => {
    if (isSuccess) {
      setTodo(data);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return <div className="Сontainer text-primary text-2xl">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="Сontainer text-red-500 text-2xl">
        Error: {error.message}
      </div>
    );
  }

  return (
    isSuccess && (
      <div className="Сontainer">
        <AddTodo />
        {(todo.data || []).map((item) => (
          <div key={item.id} className="TodoContainer">
            <Todo todo={todo} {...item} />
          </div>
        ))}
      </div>
    )
  );
};

export default TodoPage;
