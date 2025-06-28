import React from 'react';
import EventsToolbar from '@/ui/events/EventsToolbar';
import EventsList from '@/ui/events/EventsList';
import StatsGrid from '@/ui/events/StatsGrid';
import TemplatesSection from '@/ui/events/TemplatesSection';

function EventsHomePage() {
  return (
    <div
      style={{ padding: '2.4rem', background: '#faf8f6', minHeight: '100vh' }}
    >
      <EventsToolbar />
      <div
        style={{
          display: 'flex',
          gap: '2.4rem',
          alignItems: 'flex-start',
          width: '100%',
          padding: ' 0px 40px',
        }}
      >
        <div style={{ flex: 1 }}>
          <StatsGrid />
        </div>
        <div>
          <EventsList />
        </div>
      </div>
      <div style={{ padding: ' 0px 40px' }}>
        <TemplatesSection />
      </div>
    </div>
  );
}

export default EventsHomePage;
