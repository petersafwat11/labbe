import React from 'react';
import styles from './partial.module.css';
function TableCell({ value, className }) {
  return (
    <div className={`${styles.tableCell} ${className}`}>{value ?? 'N/A'}</div>
  );
}

export default TableCell;
