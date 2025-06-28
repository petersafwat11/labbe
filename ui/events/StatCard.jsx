'use client';
import React from 'react';
import styles from './StatCard.module.css';
import CardLayout from '../commen/card/CardLayout';

function StatCard({ icon, label, value, sublabel }) {
  return (
    <CardLayout>
      <div className={styles.info}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
        <div className={styles.sublabel}>{sublabel}</div>
      </div>
      <div className={styles.iconBox}>
        <img src={icon} alt={label} />
      </div>
    </CardLayout>
  );
}

export default StatCard;
