/* eslint-disable react/prop-types */

const TextareaField = ({
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
  type,
  name
}) => {
  return (
    <>
      <div className={`TextareaField inputFieldBox ${clsName ? clsName : ""}`}>
        <label className="inputLabel" htmlFor="">
          {labelName} <p>{optional}</p>
          <span>{required}</span>
        </label>
        <textarea
          name={name}
          minLength={min}
          maxLength={max}
          disabled={disabled}
          onChange={onChange}
          type={type? type : "text"}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={error && 'errorBgBorder'}
        />
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default TextareaField;
