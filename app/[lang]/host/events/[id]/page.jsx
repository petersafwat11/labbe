'use client';
import React from 'react';
import EventHeader from './_components/EventHeader';
import EventStats from './_components/EventStats';
import GuestTable from './_components/GuestTable';
import SupervisorsCard from './_components/SupervisorsCard';
import styles from './singleEvent.module.css';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function EventDetailsPage() {
  const isLg = useMediaQuery('(min-width: 1024px)');
  return (
    <div className={styles.page}>
      {/* Header */}
      <EventHeader />

      {/* Stats Row */}
      <div>
        <div>
          <EventStats />
          {!isLg && (
            <div style={{ marginBottom: '24px' }}>
              <SupervisorsCard />
            </div>
          )}
          <div className={styles.columns}>
            <GuestTable />
          </div>
        </div>
        {isLg && <SupervisorsCard />}
      </div>
    </div>
  );
}
