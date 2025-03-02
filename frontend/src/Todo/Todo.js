import React, { memo } from "react";
import "./style.css";

const Todo = ({ title }) => {
  return (
    <>
      {title}
      <div className="TodoButtons">
        <button>done</button>
        <button>x</button>
      </div>
    </>
  );
};

export default memo(Todo);
