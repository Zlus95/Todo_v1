import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import "./style.css";
import api from "../api";

async function login(user) {
  const { data } = await api.post("/login", user);
  localStorage.setItem("token", data.token);
  return data;
}

const Auth = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [validForm, setValid] = useState(false);

  const changeInput = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setValid(email.trim() !== "" && password.trim() !== "");
  };

  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: () => navigate("/tasks"),
    onError: ({ response }) => alert(response.data),
  });

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      mutationLogin.mutate({ email, password });
    }
  };

  return (
    <form className="Сontainer" onSubmit={handlerSubmit}>
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
