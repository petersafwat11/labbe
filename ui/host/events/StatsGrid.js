'use client';
import React from 'react';
import StatCard from './StatCard';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import styles from './StatsGrid.module.css';

const dummyStats = [
  {
    icon: '/svg/auth/calendar.svg',
    labelKey: 'stats.activeEvents',
    value: 2,
    sublabelKey: 'stats.avgAttendance',
  },
  {
    icon: '/svg/auth/calendar.svg',
    labelKey: 'stats.completedEvents',
    value: 2,
    sublabelKey: 'stats.avgAttendance',
  },
  {
    icon: '/svg/auth/calendar.svg',
    labelKey: 'stats.completedEvents',
    value: 2,
    sublabelKey: 'stats.avgAttendance',
  },
  {
    icon: '/svg/auth/calendar.svg',
    labelKey: 'stats.completedEvents',
    value: 2,
    sublabelKey: 'stats.avgAttendance',
  },
  // Add more stats as needed
];

function StatsGrid() {
  const { t } = useTranslation('home-events');
  const isLg = useMediaQuery('(min-width: 1024px)');

  const swiperOptions = {
    modules: [FreeMode],
    slidesPerView: 1.6,
    spaceBetween: 10,
    freeMode: true,
    grabCursor: true,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 12,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 5,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
    },
  };

  if (!isLg)
    return (
      <div className={styles.swiperContainer}>
        <Swiper {...swiperOptions}>
          {dummyStats.map((stat, idx) => (
            <SwiperSlide key={idx}>
              <StatCard
                icon={stat.icon}
                label={t(stat.labelKey, 'Label')}
                value={stat.value}
                sublabel={t(stat.sublabelKey, 'متوسط الاستجابة')}
                variant="swiper"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2.4rem',
      }}
    >
      {dummyStats.map((stat, idx) => (
        <StatCard
          key={idx}
          icon={stat.icon}
          label={t(stat.labelKey, 'Label')}
          value={stat.value}
          sublabel={t(stat.sublabelKey, 'متوسط الاستجابة')}
        />
      ))}
    </div>
  );
}

export default StatsGrid;
