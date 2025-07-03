import React from 'react';
import Button from '@/ui/commen/button/Button';
import styles from '../singleEvent.module.css';

export default function EventHeader() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        <img src="/svg/events/back-arrow.svg" alt="" />
        تفاصيل المناسبة
      </h1>
      <div className={styles.actions}>
        <Button variant="secondary" title="ارسال رساله استكمالية" />
        <Button variant="secondary" title="إضافة ضيف" />
        <Button variant="secondary" title="دعوتك علينا" />
      </div>
    </div>
  );
}
