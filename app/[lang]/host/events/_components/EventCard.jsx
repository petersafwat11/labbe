import React from 'react';
import styles from '../event.module.css';
import CardLayout from '@/ui/commen/card/CardLayout';

function EventCard({ stat, idx }) {
  return (
    <CardLayout className={styles.statCard} key={idx}>
      <div>
        <div className={styles.statLabel}>{stat.label}</div>
        <div className={styles.statValue}>{stat.value}</div>
        {stat.subLabel && (
          <div className={styles.statSubLabel}>{stat.subLabel}</div>
        )}
      </div>
      <div style={{ height: '100%' }}>
        <img src={stat.icon} alt="" />
      </div>
    </CardLayout>
  );
}

export default EventCard;
