'use client';
import React from 'react';
import EventHeader from './_components/EventHeader';
import EventStats from './_components/EventStats';
import GuestTable from './_components/GuestTable';
import SupervisorsCard from './_components/SupervisorsCard';
import styles from './singleEvent.module.css';

export default function EventDetailsPage() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '40px',
        background: '#faf8f6',
      }}
    >
      {/* Header */}
      <EventHeader />

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 2 }}>
          <EventStats />
          <div className={styles.columns}>
            {/* <div className={styles.leftCol}></div> */}
            <GuestTable />
          </div>
        </div>
        <SupervisorsCard />
      </div>
    </div>
  );
}
