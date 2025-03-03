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
      <div className="h-72 w-80 border rounded border-orange-400">
        <p className="flex justify-center text-primary text-2xl">Todo List</p>
        <div className="flex justify-center flex-col p-4 gap-4">
          <label htmlFor="email" className="text-white/50">
            Email:
          </label>
          <input
            placeholder="login"
            id="email"
            onChange={changeInput}
            ref={emailRef}
          />
          <label htmlFor="password" className="text-white/50">
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

        <div className="flex justify-center gap-4 pb-2">
          <button
            className={validForm ? "text-primary" : "text-primary/50"}
            disabled={!validForm}
          >
            sign in
          </button>
        </div>
        <div className="flex justify-center gap-2">
          <p className="text-white/50">Don't have an account?</p>
          <Link to="/register" className="text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Auth;
