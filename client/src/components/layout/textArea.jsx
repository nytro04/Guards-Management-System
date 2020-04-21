import React from "react";

const Inputtextarea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{label}</div>
        </div>
        <textarea
          className="form-control"
          id={name}
          name={name}
          {...rest}
          rows="3"
        ></textarea>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Inputtextarea;
