import React, { memo, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function createTodo(todo) {
  const { data } = await axios.post("http://localhost:8080/task", todo);
  return data;
}


const AddTodo = ({ setTodo }) => {
  const queryClient = useQueryClient();
  const valueRef = useRef(null);

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries(["todoList"]),
  });

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (valueRef.current) {
      const value = valueRef.current.value;
      mutation.mutate({ title: value, done: false });
      valueRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handlerSubmit} className="FormСontainer">
      <input type="text" ref={valueRef} id="todo" />
      <button className="AddButton">+</button>
    </form>
  );
};

export default memo(AddTodo);
