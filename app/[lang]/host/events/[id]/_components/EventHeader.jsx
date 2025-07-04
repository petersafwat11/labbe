import React from 'react';
import Button from '@/ui/commen/button/Button';
import styles from '../singleEvent.module.css';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function EventHeader() {
  const isLg = useMediaQuery('(min-width: 1024px)');
  if (!isLg)
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <img
              src={`/svg/events/${
                isLg ? 'back-arrow' : 'back-arrow-small'
              }.svg`}
              alt=""
            />
            تفاصيل المناسبة
          </h1>

          <Button variant="primary" title="دعوتك علينا" />
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" title="ارسال رساله استكمالية" />
          <Button variant="secondary" title="إضافة ضيف" />
        </div>
      </div>
    );
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
