import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {server} from '../App'

const Task = ({ data, index }) => {
  // navigator
  const navigate = useNavigate();

  // delete a task
  const handleDelete = async (id) => {
    const deletedTask = await fetch(`${server}/task/${id}`, {
      method: "DELETE",
    });

    const { success, message } = await deletedTask.json();
    if (!success) {
      return toast.error(message);
    }
    toast.success(message);
    navigate("/");
  };

  return (
    <div className="task">
      <div className="d-flex justify-content-between align-items-center">
        <h4>
          {index}. {data.task}
        </h4>

        <div className="d-flex ">
          <label className="container1">
            <input type="checkbox" />
            <div className="checkmark"></div>
          </label>

          <div
            className="icon"
            onClick={() => {
              handleDelete(data._id);
            }}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </div>
        </div>
      </div>
      <p>{data.msg}</p>
    </div>
  );
};

export default Task;
