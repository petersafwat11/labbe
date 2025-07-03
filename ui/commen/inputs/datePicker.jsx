'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { get } from 'lodash';
import { format } from 'date-fns';
import styles from './datePicker.module.css';
import Image from 'next/image';
import Calendar from './Calendar';

const DatePicker = ({
  name,
  label = '',
  placeholder = 'Select date',
  required = true,
  ServerErrors,
  disabled = false,
  minDate,
  maxDate,
}) => {
  const { control, watch, clearErrors } = useFormContext();
  const {
    field: { onChange, value },
    fieldState,
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);

  const error =
    get(errors, name)?.message ||
    ServerErrors?.response?.data?.errors?.[name]?.[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (date) => {
    onChange(date);
    clearErrors(name);
    setIsOpen(false);
  };

  const isDateDisabled = (date) => {
    if (disabled) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  return (
    <div className={styles.date_picker_group}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.date_picker_container} ref={datePickerRef}>
        <button
          type="button"
          className={`${styles.date_picker_button} ${
            error ? styles.date_picker_button_error : ''
          } ${disabled ? styles.date_picker_button_disabled : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <Image
            src="/svg/events/calendar.svg"
            alt="calendar"
            width={16}
            height={16}
            className={styles.calendar_icon}
          />
          <span className={styles.date_picker_text}>
            {value ? format(new Date(value), 'PPP') : placeholder}
          </span>
          {error && (
            <div className={styles.error_icon}>
              <Image
                src="/svg/auth/info-circle.svg"
                alt="error"
                width={16}
                height={16}
              />
            </div>
          )}
        </button>

        {/* Calendar Dropdown */}
        <div
          className={styles.calendar_dropdown}
          style={{
            transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transition: 'transform 0.2s ease',
          }}
        >
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            showOutsideDays={true}
            className={styles.calendar}
          />
        </div>
      </div>

      {error && (
        <div className={styles.error_container}>
          <p className={styles.error}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
