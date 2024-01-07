// Components/Navbar.js
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const context = useContext(noteContext);
  let username;
  let name;

  if (localStorage.getItem("username")) {
    // If localStorage has a non-empty username, set the variable
    username = localStorage.getItem("username");
    name = localStorage.getItem("name");
  } else {
    // If localStorage doesn't have a username, set the variable to null or a default value
    username = null; // or username = "Default";
    name = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    context.loginUser(null); // Clear user information on logout
    navigate("/Login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {" "}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            SwiftNOtes
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
            <span className="navbar-toggler-icon "></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            data-bs-theme="dark"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>

                <Link
                  to="/Login"
                  className="btn btn-primary mx-3"
                  role="button"
                >
                  LogIn
                </Link>
                <Link
                  to="/Signup"
                  className="btn btn-primary mx-3"
                  role="button"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <>
                <button onClick={handleLogout} className="btn btn-primary mx-3">
                  Logout
                </button>
                {/* Display user's name if logged in */}
                <div style={{ color: "white" }}>
                  Hello {name} ! <br />
                  Email:{username}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
