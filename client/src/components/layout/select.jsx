import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{label}</div>
        </div>
        <select className="form-control" name={name} id={name} {...rest}>
          <option value="" />
          {options.map((option) => (
            <option key={option.id} values={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
