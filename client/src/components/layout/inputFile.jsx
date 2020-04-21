import React from "react";

const Inputfile = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{label}</div>
        </div>
        <div>
          {" "}
          <input
            type="file"
            className="form-control-file"
            id={name}
            {...rest}
            name={name}
          />
          <img src="" alt="" className="d-block img-fluid mb-3" />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Inputfile;
