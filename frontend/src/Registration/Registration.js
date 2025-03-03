import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../api";

async function registration(user) {
  const { data } = await api.post("/register", user);
  return data;
}

const Registration = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [validForm, setValid] = useState(false);

  const changeInput = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const lastName = lastNameRef.current.value;
    setValid(
      email.trim() !== "" &&
        password.trim() !== "" &&
        name.trim() !== "" &&
        lastName.trim() !== ""
    );
  };

  const mutationReg = useMutation({
    mutationFn: registration,
    onSuccess: () => navigate("/login"),
  });

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (
      emailRef.current &&
      passwordRef.current &&
      nameRef.current &&
      lastNameRef.current
    ) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const name = nameRef.current.value;
      const lastName = lastNameRef.current.value;
      mutationReg.mutate({ email, password, name, lastName });
    }
  };

  const inputFields = [
    {
      id: "Name",
      label: "Name:",
      placeholder: "Name",
      ref: nameRef,
    },
    {
      id: "Last Name",
      label: "Last Name:",
      placeholder: "Last Name",
      ref: lastNameRef,
    },
    {
      id: "email",
      label: "Email:",
      placeholder: "login",
      ref: emailRef,
    },
    {
      id: "password",
      label: "Password:",
      placeholder: "password",
      type: "password",
      ref: passwordRef,
    },
  ];

  return (
    <form className="Сontainer" onSubmit={handlerSubmit}>
      <div className="h-96 СontainerDiv">
        <p className="Title">Todo List</p>
        <div className="СontainerInput gap-2">
          {inputFields.map((field) => (
            <React.Fragment key={field.id}>
              <label htmlFor={field.id} className="TextStyle">
                {field.label}
              </label>
              <input
                placeholder={field.placeholder}
                id={field.id}
                onChange={changeInput}
                ref={field.ref}
                type={field.type || "text"}
              />
            </React.Fragment>
          ))}
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
