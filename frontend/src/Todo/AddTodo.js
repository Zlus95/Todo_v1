import React, { memo, useRef } from "react";

const AddTodo = ({ setTodo }) => {
  const valueRef = useRef(null);

  const handlerSubmit = (event) => {
    event.preventDefault();
    const value = valueRef.current.value;
    setTodo((prev) => [...prev, value]);
    valueRef.current.value = "";
  };

  return (
    <form onSubmit={handlerSubmit} className="FormСontainer">
      <input type="text" ref={valueRef} id="todo" />
      <button className="AddButton">+</button>
    </form>
  );
};

export default memo(AddTodo);
