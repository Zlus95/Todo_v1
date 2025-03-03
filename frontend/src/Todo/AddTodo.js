import React, { memo, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

async function createTodo(todo) {
  const { data } = await api.post("/task", todo);
  return data;
}

const AddTodo = () => {
  const queryClient = useQueryClient();
  const valueRef = useRef(null);
  const [validForm, setValid] = useState(false);

  const changeInput = () => {
    const value = valueRef.current.value;
    setValid(value.trim() !== "");
  };

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
      <input type="text" onChange={changeInput} ref={valueRef} id="todo" />
      <button
        disabled={!validForm}
        className={validForm ? "AddButton" : "AddButton opacity-50"}
      >
        +
      </button>
    </form>
  );
};

export default memo(AddTodo);
