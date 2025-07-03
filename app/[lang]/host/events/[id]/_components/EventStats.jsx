import React from 'react';
import CardLayout from '@/ui/commen/card/CardLayout';
import { singleEventStats } from '@/staticData/events/data';
import styles from '../singleEvent.module.css';

export default function EventStats() {
  return (
    <div className={styles.statsRow}>
      <CardLayout className={styles.overview}>
        <div className={styles.sectionTitle}>متابعة الحضور</div>
        <div className={styles.statsGrid}>
          {singleEventStats.map((stat, idx) => (
            <CardLayout
              key={idx}
              className={styles.statCard}
              style={{ background: stat.color, color: stat.textColor }}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabelRow}>
                {stat.icon && (
                  <img src={stat.icon} alt="icon" className={styles.statIcon} />
                )}
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </CardLayout>
          ))}
        </div>
      </CardLayout>
    </div>
  );
}
