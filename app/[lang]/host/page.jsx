import React from 'react';
import EventsToolbar from '@/ui/host/events/EventsToolbar';
import EventsList from '@/ui/host/events/EventsList';
import StatsGrid from '@/ui/host/events/StatsGrid';
import TemplatesSection from '@/ui/host/events/TemplatesSection';
import styles from './page.module.css';
function EventsHomePage() {
  return (
    <div className={styles.page}>
      <EventsToolbar />
      <div className={styles.eventsContainer}>
        <div style={{ width: '100%' }}>
          <StatsGrid />
        </div>
        <div style={{ width: '100%' }}>
          <EventsList />
        </div>
      </div>
      <div className={styles.templatesContainer}>
        <TemplatesSection />
      </div>
    </div>
  );
}

export default EventsHomePage;
