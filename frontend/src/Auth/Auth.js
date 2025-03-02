import React, { useState, useRef } from "react";
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
        <div className="flex justify-center flex-col p-4 gap-6">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="login"
            id="email"
            onChange={changeInput}
            ref={emailRef}
          />
          <label htmlFor="password">Password:</label>
          <input
            placeholder="password"
            type="password"
            id="password"
            ref={passwordRef}
            onChange={changeInput}
          />
        </div>
        <hr />
        <br />
        <div className="flex justify-center gap-4 pb-2">
          <button
            className={validForm ? "text-primary" : "text-primary/50"}
            disabled={!validForm}
          >
            sign in
          </button>
          {"or"}
          <button className="text-primary">sign up</button>
        </div>
      </div>
    </form>
  );
};

export default Auth;
