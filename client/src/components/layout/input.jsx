import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{label}</div>
        </div>
        <input className="form-control" {...rest} name={name} id={name} />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
