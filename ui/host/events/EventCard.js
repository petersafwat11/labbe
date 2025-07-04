'use client';
import React from 'react';
import styles from './EventCard.module.css';
import { useTranslation } from 'react-i18next';
import Button from '@/ui/commen/button/Button';
import { useMediaQuery } from '@/hooks/use-media-query';

function EventCard({ event }) {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { t } = useTranslation('home-events');
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <img
          style={{
            backgroundColor: '#F9F6F2',
            width: isMobile ? 40 : 80,
            height: isMobile ? 40 : 80,
            borderRadius: '12px',
          }}
          src="/svg/auth/calendar.svg"
          alt=""
        />
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.title}>{event.title}</span>
            <span className={styles.status}>
              {t('eventCard.status.upcoming')}
            </span>
          </div>

          {!isMobile && (
            <>
              <div className={styles.details}>
                <div className={styles.detailSection}>
                  <img src="/svg/events/people.svg" alt="" />
                  <span>{event.guest}</span>
                </div>
                <div className={styles.detailSection}>
                  <img src="/svg/events/calendar.svg" alt="" />
                  <span>{event.date}</span>
                </div>
              </div>
              <div className={styles.detailSection}>
                <img src="/svg/events/location.svg" alt="" />
                <span>{event.location}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.stats}>
          <div className={styles.replying}>
            <span>{t('eventCard.stats.replyStatus')}</span>
            <span>
              {event.replyingRate} {t('eventCard.stats.responseRate')}
            </span>
          </div>
          <div className={styles.replyingAnalysis}>
            <div className={styles.replyingAnalysisSection}>
              <span
                className={styles.replyingAnalysisSectionColor}
                style={{ backgroundColor: '#2A8C5B' }}
              ></span>
              <span className={styles.replyingAnalysisSectionText}>
                {t('eventCard.stats.confirmed')}:
              </span>
              <span className={styles.replyingAnalysisSectionValue}>120</span>
            </div>
            <div className={styles.replyingAnalysisSection}>
              <span
                className={styles.replyingAnalysisSectionColor}
                style={{ backgroundColor: '#C0392B' }}
              ></span>
              <span className={styles.replyingAnalysisSectionText}>
                {t('eventCard.stats.apologies')}:
              </span>
              <span className={styles.replyingAnalysisSectionValue}>15</span>
            </div>
            <div className={styles.replyingAnalysisSection}>
              <span
                className={styles.replyingAnalysisSectionColor}
                style={{ backgroundColor: '#A0A0A0' }}
              ></span>
              <span className={styles.replyingAnalysisSectionText}>
                {t('eventCard.stats.noReply')}:
              </span>
              <span className={styles.replyingAnalysisSectionValue}>15</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          className={styles.actionPrimaryButton}
          variant="primary"
          icon="/svg/events/setting-2.svg"
          title={t('eventCard.actions.manage')}
          onClick={() => console.log('Manage event clicked')}
        />
        <Button
          className={styles.actionButton}
          variant="secondary"
          icon="/svg/events/diagram.svg"
          title={t('eventCard.actions.viewStats')}
          onClick={() => console.log('View stats clicked')}
        />
        <Button
          className={styles.actionButton}
          variant="secondary"
          icon="/svg/events/copy.svg"
          title={t('eventCard.actions.duplicate')}
          onClick={() => console.log('Duplicate event clicked')}
        />
      </div>
    </div>
  );
}

export default EventCard;
