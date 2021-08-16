import React from "react";

const Select = (props) => {
  const { options, valueKey, titleKey, allTitle, value, onSelect } = props;
  return (
    <select value={value} onChange={(event) => onSelect(event.target.value)}>
      <option value="all">
        {allTitle}
      </option>
      {
        options.map(option => {
          return (
            <option 
              disabled={!option.active}
              key={option[valueKey]}
              value={option[valueKey]}
            >
              {option[titleKey]}
            </option>
          );
        })
      }
    </select>
  );
};

export default Select;