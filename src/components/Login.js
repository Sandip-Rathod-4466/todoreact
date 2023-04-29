import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { server } from "../App";

const Login = () => {
  // navigate
  const navigate = useNavigate();

  // dispatch

  // set values from the user
  const [value, setValues] = useState({
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
    if (!(value.email && value.password)) {
      return toast.error("can not add empty fields");
    }

    try {
     

      const data = await sendData();

      // set user in localstorage
      const user = JSON.stringify(data.user);
      if (user) {
        localStorage.setItem("user", user);
      }

      const { success, message } = data;

      if (!success) {
        return toast.error(message);
      }

    await  toast.promise(sendData(), {
        loading: "verifying...",
        success: <b>{message}</b>,
        error: <b>user not registerd!</b>,
      });


      setValues({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      toast.error(`internal server error`);
    }
  };

  const sendData = async () => {
    const res = await fetch(`${server}/user/login`, {
      method: "post",
      body: JSON.stringify(value),
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  };

  return (
    <section className="loginsection">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="taskForm">
            <h2>Login</h2>
              <input
                type="text"
                id="name"
                name="email"
                placeholder="enter your email"
                autoComplete="off"
                value={value.email}
                onChange={handlevalue}
              />

              <input
                type="text"
                id="email"
                name="password"
                placeholder="password"
                autoComplete="off"
                value={value.password}
                onChange={handlevalue}
              />

              <button onClick={handlesend} className="mainbtn">
                <span>login</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
