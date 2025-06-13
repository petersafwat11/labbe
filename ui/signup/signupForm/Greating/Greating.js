import React from 'react';
import styles from './greating.module.css';
const Greating = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Your Account</h2>
      <p className={styles.signup_text}>Join Labaa and start creating amazing events</p>
    </div>
  );
};

export default Greating; 