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

    const successHandler = (data) => {
      
      // set user in localstorage
      const user = JSON.stringify(data.user);
      if (user) {
        localStorage.setItem("user", user);
      }

      const { success, message } = data;
      if (!success) {
        return (message) ;
      }


      setValues({
        email: "",
        password: "",
      });

      navigate("/");

      return message
    };

    try {
      // for button
      const text = document.getElementById("btn-txt");
      text.innerHTML = `<span >verifying</span> `
      text.setAttribute("disabled","")

    const data =  await toast.promise(sendData(), {
        loading: "verifying...",
        success: successHandler,
        error: <b>internal server error!</b>,
      });

      if (!(data.success)) {
        text.innerHTML = `<span >Login</span> `
        text.removeAttribute("disabled","");
      }

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
            <form className="taskForm"  onSubmit={handlesend}>
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

              <button className="mainbtn" id="btn-txt" >
                <span >login</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
