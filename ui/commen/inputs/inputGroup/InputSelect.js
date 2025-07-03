'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './inputGroup.module.css';
import Image from 'next/image';
import { get, useFormContext } from 'react-hook-form';

const InputSelect = ({
  label,
  placeholder,
  name,
  iconPath,
  onIconClick,
  hintMessage,
  required,
  options = [],
  value: inputValue,
  onChange,
  disabled = false,
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useFormContext();
  const error = get(errors, name)?.message;
  const watchedValue = watch(name);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const isControlled = inputValue !== undefined && onChange !== undefined;

  // Find the selected option based on watched value or controlled value
  useEffect(() => {
    const currentValue = isControlled ? inputValue : watchedValue;
    if (currentValue) {
      const option = options.find((opt) => opt.value === currentValue);
      setSelectedOption(option);
      setSearchTerm(option ? option.label : '');
    } else {
      setSelectedOption(null);
      setSearchTerm('');
    }
  }, [isControlled ? inputValue : watchedValue, options, isControlled]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    clearErrors(name);
    setSearchTerm(option.label);

    if (isControlled) {
      onChange(option);
    } else {
      setValue(name, option.value);
    }

    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    // clearErrors(name);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.input_group}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.input_container} ref={dropdownRef}>
        <input
          className={error ? styles.input_error : styles.input}
          type="text"
          placeholder={placeholder}
          name={name}
          {...(isControlled ? {} : register(name))}
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleInputClick}
          disabled={disabled}
          readOnly={!isOpen}
          style={{
            paddingRight: iconPath ? '4.8rem' : '1.2rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            backgroundImage: "url('/svg/events/brown-down-arrow.svg')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1.2rem center',
            backgroundSize: '1.6rem',

            transition: 'transform 0.2s ease',
          }}
        />
        {iconPath && (
          <Image
            className={styles.icon}
            src={`/svg/${iconPath}`}
            alt="icon"
            width={24}
            height={24}
            onClick={onIconClick}
          />
        )}

        {/* Custom Dropdown */}
        {/* {isOpen && ( */}
        <div
          className={styles.dropdown}
          style={{
            transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transition: 'transform 0.2s ease',
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className={styles.dropdown_option}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className={styles.dropdown_option}>No options found</div>
          )}
        </div>
        {/* // )} */}
      </div>
      {error && (
        <div className={styles.error_container}>
          <p className={styles.error}>{error}</p>
        </div>
      )}
      {hintMessage && <p className={styles.hint}>{hintMessage}</p>}
    </div>
  );
};

export default InputSelect;
