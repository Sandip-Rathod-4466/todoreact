import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { server } from "../App";

const Register = () => {
  // navigate
  const navigate = useNavigate();
  // set values from the user
  const [value, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  // onchange handler
  const handlevalue = (e) => {
    const { value, name } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlesend = async (e) => {
    e.preventDefault();

    // chech any empty field from user
    if (!(value.username && value.email && value.password)) {
      return toast.error("can not add empty fields");
    }

    // handling promise from api
    const successHandle = (data) => {
      const { message, success } = data;
      if (!success) {
        navigate("/login");
        return message;
      }

      setValues({
        username: "",
        email: "",
        password: "",
      });

      navigate("/login");

      return message;
    };

    try {
      // for button
      const text = document.getElementById("btn-txt2");
      text.innerHTML = `<span >verifying</span> `
      text.setAttribute("disabled","")

     const data =  await toast.promise(newUser(), {
        loading: "Saving...",
        success: successHandle,
        error: <b>Could not save.</b>,
      });

      if (!(data.success)) {
        text.innerHTML = `<span >Register</span> `
        text.removeAttribute("disabled","");
      }

    } catch (error) {
      return toast.error(error.message);
    }
  };

  const newUser = async () => {
    const res = await fetch(`${server}/user/register`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  };

  return (
    <section className="homesection">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="taskForm" onSubmit={handlesend}>
              <h2>Register</h2>
              <input
                type="text"
                id="task"
                name="username"
                placeholder="username"
                autoComplete="off"
                value={value.username}
                onChange={handlevalue}
              />

              <input
                name="email"
                id="email"
                placeholder="email "
                value={value.email}
                onChange={handlevalue}
                autoComplete="off"
              />

              <input
                name="password"
                id="password"
                placeholder="password "
                value={value.password}
                autoComplete="off"
                onChange={handlevalue}
              />

              <button className="mainbtn" id="btn-txt2">
                <span>Register</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
