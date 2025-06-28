'use client';
import React from 'react';
import styles from './event.module.css';
import EventsHeader from './_components/EventsHeader';
import EventsOverview from './_components/EventsOverview';
import GuestAcceptanceChart from './_components/GuestAcceptanceChart';
import EventsTable from './_components/EventsTable';

function Events() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '40px',
        background: '#faf8f6',
      }}
    >
      <EventsHeader />
      <div className={styles.sectionsWrapper}>
        <EventsOverview />
        <GuestAcceptanceChart />
      </div>
      <EventsTable />
    </div>
  );
}

export default Events;
