// Components/Home.js
import React, { useContext, useState } from "react";
import Notes from "./Notes";
import noteContext from "../Context/Notes/noteContext";

const Home = () => {
  const context = useContext(noteContext);

  // State for the form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // Add more fields if needed
  });

  // Destructure values from formData
  const { email, password } = formData;

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any necessary actions with the form data
    // For example, you can add a new note to the state
    context.setNotes([
      ...context.notes,
      { title: "New Note", content: "Note content" },
    ]);

    // Clear the form after submission
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <Notes />
    </div>
  );
};

export default Home;
