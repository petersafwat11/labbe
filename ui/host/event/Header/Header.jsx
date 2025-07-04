'use client';
import React from 'react';
import styles from './Header.module.css';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@/hooks/use-media-query';
import useSidebarStore from '@/stores/sidebarStore';

function Header() {
  const { t } = useTranslation('home-events');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const { setIsOpen } = useSidebarStore();
  return (
    <div className={styles.headerContainer}>
      {isLg ? (
        <div className={styles.searchSection}>
          <span className={styles.searchIcon}>
            <img src="/svg/events/search.svg" alt="search" />
          </span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder={t('header.searchPlaceholder', 'بحث')}
          />
        </div>
      ) : (
        <div className={styles.headerMobileLogo}>
          <button onClick={() => setIsOpen(true)} className={styles.toggleMenu}>
            <img src="/svg/events/menu.svg" alt="menu" />
          </button>
          <button className={styles.toggleSidebar}>
            <img src="/svg/events/sidebar-mobile-logo.svg" alt="sidebar" />
          </button>
        </div>
      )}
      <div className={styles.iconsRow}>
        <img
          src="/svg/events/notification.svg"
          alt="notifications"
          className={styles.icon}
        />
        {isLg && (
          <img
            src="/svg/events/message.svg"
            alt="messages"
            className={styles.icon}
          />
        )}

        <div className={styles.profile}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>
              {t('header.userName', 'أحمد جمال الدين')}
            </div>
            <div className={styles.userRole}>
              {t('header.userRole', 'إدارة فعاليات')}
            </div>
          </div>
          <button className={styles.toggleProfileMenu}>
            <img
              src="/svg/events/brown-down-arrow.svg"
              alt="profile"
              className={styles.icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
