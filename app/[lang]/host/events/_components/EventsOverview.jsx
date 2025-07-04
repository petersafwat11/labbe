import React from 'react';
import CardLayout from '@/ui/commen/card/CardLayout';
import { eventsStats } from '@/staticData/events/data';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import EventCard from './EventCard';
import styles from '../event.module.css';

const EventsOverview = () => {
  const isLg = useMediaQuery('(min-width: 1024px)');

  const eventsGrid = () => (
    <>
      {eventsStats.map((stat, idx) => (
        <EventCard stat={stat} idx={idx} />
      ))}
    </>
  );

  const eventSwiper = () => (
    <Swiper
      spaceBetween={16}
      slidesPerView={1.2}
      loop={true}
      breakpoints={{
        320: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
      }}
    >
      {eventsStats.map((stat, idx) => (
        <SwiperSlide key={idx}>
          <EventCard stat={stat} idx={idx} />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <CardLayout className={styles.overview}>
      <div className={styles.sectionTitle}>نظرة عامة</div>
      <div className={styles.statsGrid}>
        {isLg ? eventsGrid() : eventSwiper()}
      </div>
    </CardLayout>
  );
};

export default EventsOverview;
