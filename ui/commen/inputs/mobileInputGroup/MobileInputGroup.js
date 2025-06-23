import React from 'react';
import styles from './inputGroup.module.css';
import Image from 'next/image';
import { get, useFormContext } from 'react-hook-form';

const MobileInputGroup = ({ label, placeholder, type, name }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const value = watch(name);
  const error = get(errors, name)?.message;

  return (
    <div className={styles.input_group}>
      <label className={styles.label}>{label}</label>
      <div className={styles.input_container}>
        <input
          className={error ? styles.input_error : styles.input}
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
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default MobileInputGroup;
