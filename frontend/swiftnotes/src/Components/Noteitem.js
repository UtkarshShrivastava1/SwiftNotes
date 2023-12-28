// Components/Noteitem.js
import React from "react";

const Noteitem = (props) => {
  const { title, description, tag, user } = props.note;

  return (
    <div className="col-md-8 my-3">
      {/* Use Bootstrap grid system */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6>{tag}</h6>
          <h6>{user}</h6>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <i className="fas fa-trash"></i>{" "}
            {/* Update with the correct class names */}
            {/* Font Awesome solid pen icon */}
            <i className="fas fa-pen-square"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
