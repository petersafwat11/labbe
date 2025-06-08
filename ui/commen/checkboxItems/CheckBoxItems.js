import React from "react";
import styles from "./checkBoxItems.module.css";

const CheckBoxItems = ({ items, checkedItems, onChange, columns = 2 }) => {
  const handleCheckboxChange = (item, event) => {
    const isChecked = event.target.checked;
    onChange(item, isChecked);
  };

  return (
    <div
      className={styles.container}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {items.map((item, index) => (
        <div className={styles.checkbox_item} key={index}>
          <input
            type="checkbox"
            id={`checkbox-${index}`}
            name={item}
            checked={checkedItems.includes(item)}
            onChange={(e) => handleCheckboxChange(item, e)}
          />
          <label htmlFor={`checkbox-${index}`}>{item}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxItems;
