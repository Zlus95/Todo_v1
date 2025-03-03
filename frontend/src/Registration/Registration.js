import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
// import "./style.css";

const Registration = () => {
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
      <div className="h-96 СontainerDiv">
        <p className="Title">Todo List</p>
        <div className="СontainerInput gap-2">
          <label htmlFor="Name" className="TextStyle">
            Name:
          </label>
          <input
            placeholder="Name"
            id="Name"
            onChange={changeInput}
            ref={emailRef}
          />
          <label htmlFor="Last Name" className="TextStyle">
            Last Name:
          </label>
          <input
            placeholder="Last Name"
            id="Last Name"
            onChange={changeInput}
            ref={emailRef}
          />
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
            Sign up
          </button>
        </div>
        <div className="SignUp">
          <p className="TextStyle">Already have an account?</p>
          <Link to="/login" className="text-primary">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Registration;
