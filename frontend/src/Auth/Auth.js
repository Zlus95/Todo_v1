import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Auth = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [validForm, setValid] = useState(false);

  const changeInput = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setValid(email.trim() !== "" && password.trim() !== "");
  };

  return (
    <form className="Сontainer">
      <div className="СontainerDiv h-72">
        <p className="Title">Todo List</p>
        <div className="СontainerInput gap-4">
          <label htmlFor="email" className="TextStyle">
            Email:
          </label>
          <input
            placeholder="login"
            id="email"
            onChange={changeInput}
            ref={emailRef}
          />
          <label htmlFor="password" className="TextStyle">
            Password:
          </label>
          <input
            placeholder="password"
            type="password"
            id="password"
            ref={passwordRef}
            onChange={changeInput}
          />
        </div>
        <div className="SignIn">
          <button
            className={validForm ? "text-primary" : "text-primary/50"}
            disabled={!validForm}
          >
            Sign in
          </button>
        </div>
        <div className="SignUp">
          <p className="TextStyle">Don't have an account?</p>
          <Link to="/register" className="text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Auth;
