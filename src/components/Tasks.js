import React, { useEffect } from "react";
import "./styles/tasks.css";
import Task from "./Task";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { advanceThunk } from "../store/taskThunk";
import { toast } from "react-hot-toast";

const Tasks = () => {
  // get user
  const user = JSON.parse(localStorage.getItem("user"));

  // dispatch
  const dispatch = useDispatch();

  // get data from api redux
  const { status, data } = useSelector((state) => {
    return state.allTasks;
  });

  // set data to the redux
  useEffect(() => {
    // dispatch(advanceThunk())

    toast.promise(dispatch(advanceThunk(`${user._id}`)), {
      loading: "loading...",
      success: <b>Loading Successfull</b>,
      error: <b>someting went worng.</b>,
    });
  }, [dispatch, user._id]);

  if (status === "loading") {
    return <Loader />;
  }
  if (status === "error") {
    return <h1>there is some error</h1>;
  }

  return (
    <div className="container">
      <div className="tasksList">
        <div className="row justify-content-center">
          <div className="col-md-6 tasks">
            <h2>Tasks</h2>
            {data.length ? (
              data.map((data, index) => {
                return <Task data={data} index={index + 1} key={index} />;
              })
            ) : (
              <p>there is no tasks</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
