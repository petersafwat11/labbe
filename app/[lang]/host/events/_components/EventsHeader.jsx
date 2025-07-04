'use client';
import React from 'react';
import Button from '@/ui/commen/button/Button';
import styles from '../event.module.css';
import { useMediaQuery } from '@/hooks/use-media-query';

const EventsHeader = () => {
  const isLg = useMediaQuery('(min-width: 1024px)');
  if (!isLg) return null;
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>المناسبات</h1>
      <div className={styles.actions}>
        <Button
          variant="secondary"
          title="تصدير البيانات"
          icon="/svg/events/export.svg"
        />
        <Button
          variant="secondary"
          title="عرض الإحصائيات"
          icon="/svg/events/diagram.svg"
        />
        <Button
          variant="primary"
          title="إدارة المناسبة"
          icon="/svg/events/setting-2.svg"
        />
      </div>
    </div>
  );
};
export default EventsHeader;
