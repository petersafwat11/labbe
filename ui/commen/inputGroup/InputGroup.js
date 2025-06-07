import React from "react";
import styles from "./inputGroup.module.css";
import Image from "next/image";
const InputGroup = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
  iconPath,
  // required,
  placement,
  iconPath2,
}) => {
  return (
    <div className={styles.input_group}>
      <label className={styles.label}>
        {label}
        {/* {required && <span className={styles.required}>*</span>} */}
      </label>
      {type === "mobile" ? (
        <div className={styles.input_container}></div>
      ) : (
        <div className={styles.input_container}>
          <input
            className={error ? styles.input_error : styles.input}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            style={{
              textAlign: placement === "left" ? "left" : "right",
            }}
          />
          <Image
            className={styles.icon}
            src={`/svg/${iconPath}`}
            alt="icon"
            width={24}
            height={24}
          />
          {type === "password" && iconPath2 && (
            <Image
              className={styles.icon_2}
              src={`/svg/${iconPath2}`}
              alt="icon"
              width={24}
              height={24}
            />
          )}
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default InputGroup;
