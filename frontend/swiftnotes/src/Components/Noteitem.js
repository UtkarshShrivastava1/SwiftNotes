import React from "react";

const Noteitem = (props) => {
  const { title, description } = props.note;

  return (
    <div className="col-md-4 my-2">
      {/* Use Bootstrap grid system */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-warning">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
