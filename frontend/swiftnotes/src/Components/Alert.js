import React from "react";

const Alert = (props) => {
  const { message, alertType } = props;

  // Default to 'alert-primary' if no alertType is specified
  const className = `alert ${alertType || "alert-primary"}`;

  return (
    <div>
      <div className={className} role="alert">
        {message}
      </div>
    </div>
  );
};

export default Alert;
