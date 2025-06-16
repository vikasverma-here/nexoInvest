/* eslint-disable react/prop-types */

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const TextInputPassword = ({
  labelName,
  optional,
  required,
  value,
  placeholder,
  clsName,
  onChange,
  disabled,
  defaultValue,
  error,
  min,
  max,
  name,
}) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div
        className={`textInput TextInputPassword inputFieldBox ${
          clsName ? clsName : ""
        }`}
      >
        <label className="inputLabel" htmlFor="">
          {labelName} <p>{optional}</p>
          <span>{required}</span>
        </label>
        <div className="pass-box">
          <input
            name={name}
            minLength={min}
            maxLength={max}
            disabled={disabled}
            onChange={onChange}
            type={showPassword ? "text" : "password"}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={error && "errorBgBorder"}
          />
          <button onClick={() => setShowPassword(!showPassword)} className="eye">{showPassword ? <FaEye /> : <FaEyeSlash />}</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default TextInputPassword;
