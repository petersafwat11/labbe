'use client';
import React from 'react';
import styles from './inputGroup.module.css';
import Image from 'next/image';
import { get, useFormContext } from 'react-hook-form';

const InputGroup = ({
  label,
  placeholder,
  type,
  name,
  iconPath,
  iconPath2,
  onIconClick,
  hintMessage,
  validations,
  prefixText,
  required,
  error: externalError,
  value: inputValue,
  onChange,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const error = get(errors, name)?.message;
  // console.log('errors,,,', errors);
  const value = watch(name);
  const isControlled = inputValue !== undefined && onChange !== undefined;

  if (isControlled) {
    return (
      <div className={styles.input_group}>
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        {type === 'mobile' ? (
          <div className={styles.input_container}></div>
        ) : (
          <div className={styles.input_container}>
            {prefixText && (
              <span className={styles.prefix_text}>{prefixText}</span>
            )}
            <input
              className={error ? styles.input_error : styles.input}
              type={type}
              placeholder={placeholder}
              name={name}
              value={inputValue}
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
            {type === 'password' && iconPath2 && (
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
        {externalError && (
          <div className={styles.error_container}>
            <p className={styles.error}>{externalError}</p>
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
  }

  return (
    <div className={styles.input_group}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {type === 'mobile' ? (
        <div className={styles.input_container}></div>
      ) : (
        <div className={styles.input_container}>
          {prefixText && (
            <span className={styles.prefix_text}>{prefixText}</span>
          )}
          <input
            className={error ? styles.input_error : styles.input}
            type={type}
            placeholder={placeholder}
            name={name}
            {...(isControlled ? {} : register(name))}
            value={inputValue || undefined}
            onChange={isControlled ? onChange : undefined}
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
          {type === 'password' && iconPath2 && (
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
      {externalError && (
        <div className={styles.error_container}>
          <p className={styles.error}>{externalError}</p>
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
