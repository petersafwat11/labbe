import React from 'react';
import CardLayout from '@/ui/commen/card/CardLayout';
import styles from '../event.module.css';
import { eventsStats } from '@/staticData/events/data';

const EventsOverview = () => (
  <CardLayout className={styles.overview}>
    <div className={styles.sectionTitle}>نظرة عامة</div>
    <div className={styles.statsGrid}>
      {eventsStats.map((stat, idx) => (
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
      ))}
    </div>
  </CardLayout>
);

export default EventsOverview;
