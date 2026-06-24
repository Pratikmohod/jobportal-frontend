import React from "react";
import Style from "./Form.module.css";

const Form = ({ data, handleChange }) => {
  return (
    <>
      {data.map((value) => {
        return (
          <aside key={value.name} className={Style.formGroup}>
            <label htmlFor={value.name} className={Style.label}>
              {value.name}
            </label>
            <input
              type={value.type}
              onChange={handleChange}
              name={value.name}
              value={value.state}
              id={value.name}
              placeholder={`Enter Your ${value.name}`}
              className={Style.input}
            />
          </aside>
        );
      })}
    </>
  );
};

export default Form;
