import React, { useState } from "react";
import "./styles/taskForm.css";
import { toast } from "react-hot-toast";
import { server } from "../App";

const Home = () => {
  // get user
  const user = JSON.parse(localStorage.getItem("user"));

  // set values from the user
  const [value, setValues] = useState({
    task: "",
    msg: "",
    user: "",
  });

  // onchange handler
  const handlevalue = (e) => {
    const { value, name } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
        user: user._id,
      };
    });
  };

  const handlesend = async (e) => {
    e.preventDefault();

    if (!user.email) {
      return toast.error("user not login");
    }

    // check if values are not given
    if (!(value.task && value.msg)) {
      return toast.error("can not add empty fields");
    }

    // send to the server
    const res = await fetch(`${server}/task/new`, {
      method: "post",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { task } = await res.json();
    if (!task._id) {
      return toast.error("internal server error");
    }

    toast.success("Task Added Successfully");

    // after save empty field
    setValues({
      task: "",
      msg: "",
    });
  };

  return (
    <section className="homesection">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="taskForm">
              <h2>Add Task</h2>
              <input
                type="text"
                id="task"
                name="task"
                placeholder="Add Title"
                autoComplete="off"
                value={value.task}
                onChange={handlevalue}
              />

              <textarea
                name="msg"
                id="disc"
                rows="3"
                placeholder="Add Discreption"
                value={value.msg}
                onChange={handlevalue}
              />

              <button onClick={handlesend} className="mainbtn">
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
