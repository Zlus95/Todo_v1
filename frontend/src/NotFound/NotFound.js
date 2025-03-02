import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="Сontainer">
      <p className="Text">Page not found</p>
      <button className="Button" onClick={() => navigate(-1)}>
        back
      </button>
    </div>
  );
};

export default memo(NotFound);
