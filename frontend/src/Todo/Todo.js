import React, { memo, useCallback } from "react";
import "./style.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function UpdateStatus(id, todo) {
  const task = await todo.find((item) => item.id === id);
  const { data } = await axios.patch(`http://localhost:8080/tasks/${id}`, {
    ...task,
    done: !task.done,
  });
  return data;
}

const Todo = (props) => {
  const queryClient = useQueryClient();
  const { title, id, done, todo } = props;

  const mutation = useMutation({
    mutationFn: (id) => UpdateStatus(id, todo.data),
    onSuccess: () => queryClient.invalidateQueries(["todoList"]),
  });

  const update = useCallback(async () => {
    await mutation.mutateAsync(id);
  }, [id, mutation]);

  return (
    <>
      {title}
      <div className="TodoButtons">
        <button
          className={done ? "text-lg StatusDone" : "text-lg StatusDoing"}
          onClick={update}
        >
          {done ? "done" : "doing"}
        </button>
        <button>x</button>
      </div>
    </>
  );
};

export default memo(Todo);
