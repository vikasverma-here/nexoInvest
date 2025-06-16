/* eslint-disable react/prop-types */

const SelectInput = ({
  labelName,
  value,
  options,
  onChange,
  name,
  error,
}) => {
  return (
    <div className={`SelectInput inputFieldBox`}>
      <label className="inputLabel">
        {labelName}
        <span className="required">*</span>
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "errorBgBorder" : ""}
      >
        <option value="">Select a user</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SelectInput;
