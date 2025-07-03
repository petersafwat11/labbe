'use client';
import React from 'react';
import styles from './EventsToolbar.module.css';
import { useTranslation } from 'react-i18next';

function EventsToolbar() {
  const { t } = useTranslation('home-events');
  return (
    <div className={styles.toolbar}>
      <div className={styles.welcome}>
        <div className={styles.welcomeTitle}>مرحباً بك، أحمد! 👋</div>
        <div className={styles.welcomeSubtitle}>
          إليك نظرة سريعة على فعالياتك ودعواتك
        </div>
      </div>

      <div className={styles.toolbarActions}>
        <button className={styles.createBtn}>
          {t('toolbar.createEvent', 'إنشاء مناسبة +')}
        </button>
      </div>
    </div>
  );
}

export default EventsToolbar;
