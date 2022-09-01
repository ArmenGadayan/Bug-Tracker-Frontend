import React from "react";

const SelectOptions = (props) => {
  const { onChange, options, defaultValue, name } = props;
  return (
    <div>
      <h6>{name[1]} </h6>
      <select  style={{textAlign: "center", marginBottom: "20px"}}  value={defaultValue} name={name[0]} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptions;
