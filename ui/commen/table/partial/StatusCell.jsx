'use client';
import React from 'react';
import styles from './partial.module.css';
function StatusCell({ value }) {
  const getVariant = () => {
    switch (value) {
      case 'active':
        return styles.active;
      case 'pending':
        return styles.pending;
      case 'ended':
        return styles.ended;
      case true:
        return styles.active;
      case false:
        return styles.ended;
      default:
        return styles.active;
    }
  };

  return <div className={`${styles.statusCell} ${getVariant()}`}>{value}</div>;
}

export default StatusCell;
