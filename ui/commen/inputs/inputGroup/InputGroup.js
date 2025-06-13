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
  iconPath2,
  onIconClick,
  hintMessage,
  validations,
  prefixText,
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
          {prefixText && <span className={styles.prefix_text}>{prefixText}</span>}
          <input
            className={error ? styles.input_error : styles.input}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            style={prefixText ? { paddingLeft: '9rem' } : {}}
          />
          {iconPath && (
            <Image
              className={styles.icon}
              src={`/svg/${iconPath}`}
              alt="icon"
              width={24}
              height={24}
            />
          )}
          {type === "password" && iconPath2 && (
            <Image
              className={styles.icon_2}
              src={`/svg/${iconPath2}`}
              alt="icon"
              width={24}
              height={24}
              onClick={onIconClick}
            />
          )}
        </div>
      )}
      {error && (
        <div className={styles.error_container}>
          <p className={styles.error}>{error}</p>
        </div>
      )}

      {hintMessage && <p className={styles.hint}>{hintMessage}</p>}

      {validations && validations.length > 0 && (
        <div className={styles.validation_rules}>
          {validations.map((rule, index) => (
            <p
              key={index}
              className={`${styles.validation_rule} ${
                rule.isValid ? styles.valid : ''
              }`}
            >
              {/* <Image
                src={rule.isValid ? '/svg/checked.svg' : '/svg/unchecked.svg'}
                alt="validation status"
                width={16}
                height={16}
              /> */}
              {rule.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputGroup;
