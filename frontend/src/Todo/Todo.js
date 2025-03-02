import React, { memo, useCallback } from "react";
import "./style.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function updateStatus(id, todo) {
  const task = await todo.find((item) => item.id === id);
  const { data } = await axios.patch(`http://localhost:8080/tasks/${id}`, {
    ...task,
    done: !task.done,
  });
  return data;
}

async function deleteTask(id) {
  const { data } = await axios.delete(`http://localhost:8080/tasks/${id}`);
  return data;
}

const Todo = (props) => {
  const queryClient = useQueryClient();
  const { title, id, done, todo } = props;

  const mutationUpdate = useMutation({
    mutationFn: (id) => updateStatus(id, todo.data),
    onSuccess: () => queryClient.invalidateQueries(["todoList"]),
  });

  const update = useCallback(async () => {
    await mutationUpdate.mutateAsync(id);
  }, [id, mutationUpdate]);

  const mutationDelete = useMutation({
    mutationFn: (id) => deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries(["todoList"]),
  });

  const deleteCallBack = useCallback(async () => {
    await mutationDelete.mutateAsync(id);
  }, [id, mutationDelete]);

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
        <button className="DeleteButton" onClick={() => deleteCallBack(id)}>
          x
        </button>
      </div>
    </>
  );
};

export default memo(Todo);
