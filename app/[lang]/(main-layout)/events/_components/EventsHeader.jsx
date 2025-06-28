import React from 'react';
import Button from '@/ui/commen/button/Button';
import styles from '../event.module.css';

const EventsHeader = () => (
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

export default EventsHeader;
