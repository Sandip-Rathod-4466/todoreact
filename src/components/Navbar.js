import React from "react";
import "./styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = () => {
  // get user
  const user = JSON.parse(localStorage.getItem("user"));

  // navigator
  const navigate = useNavigate();

  // hide and show toogler
  const handlehide = () => {
    let ul = document.getElementById("navbarSupportedContent");
    ul.classList.toggle("show");
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout successfull");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"} onClick={handlehide}>
          ToDoApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item" onClick={handlehide}>
                  <Link className="nav-link " aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item" onClick={handlehide}>
                  <Link className="nav-link" to="/tasks">
                    Tasks
                  </Link>
                </li>
                <li className="nav-item" onClick={handlehide}>
                  <Link className="nav-link" to={"/profile"}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => {
                      handlehide();
                      handleLogout();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={handlehide}
                    to={"/register"}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={handlehide} to={"/login"}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
