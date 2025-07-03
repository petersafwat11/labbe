import React from "react";
import styles from "./inputGroup.module.css";
import Image from "next/image";
import { get, useFormContext } from "react-hook-form";

const MobileInputGroup = ({
  label,
  placeholder,
  type,
  name,
  value: inputValue,
  onChange,
  required,
  error: externalError,
  hintMessage,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const value = watch(name);
  const error = get(errors, name)?.message;
  const isControlled = inputValue !== undefined && onChange !== undefined;

  if (isControlled) {
    return (
      <div className={styles.input_group}>
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <div className={styles.input_container}>
          <input
            className={error ? styles.input_error : styles.input}
            type={type}
            placeholder={placeholder}
            name={name}
            value={inputValue}
            onChange={onChange}
          />
          <div className={styles.code}>
            <p className={styles.code_text}>+966</p>
            <Image
              className={styles.icon}
              src="/svg/auth/flag.svg"
              alt="icon"
              width={20}
              height={21}
            />
          </div>
        </div>
        {(externalError || error) && (
          <div className={styles.error_container}>
            <p className={styles.error}>{externalError || error}</p>
          </div>
        )}
        {hintMessage && <p className={styles.hint}>{hintMessage}</p>}
      </div>
    );
  }

  return (
    <div className={styles.input_group}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.input_container}>
        {/* <input
          className={error ? styles.input_error : styles.input}
          type={type}
          placeholder={placeholder}
          name={name}
          {...(isControlled ? {} : register(name))}
          value={inputValue || undefined}
          onChange={isControlled ? onChange : undefined}
        /> */}
        <input
          className={error || externalError ? styles.input_error : styles.input}
          type={type}
          placeholder={placeholder}
          name={name}
          {...register(name)}
          value={value || ''}
        />

        <div className={styles.code}>
          <p className={styles.code_text}>+966</p>
          <Image
            className={styles.icon}
            src="/svg/auth/flag.svg"
            alt="icon"
            width={20}
            height={21}
          />
        </div>
      </div>
      {(externalError || error) && (
        <div className={styles.error_container}>
          <p className={styles.error}>{externalError || error}</p>
        </div>
      )}
      {hintMessage && <p className={styles.hint}>{hintMessage}</p>}
    </div>
  );
};

export default MobileInputGroup;
