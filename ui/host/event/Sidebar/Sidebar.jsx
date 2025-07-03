'use client';
import React from 'react';
import styles from './sidebar.module.css';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { authAPI } from '@/lib/auth';
import Link from 'next/link';

function Sidebar() {
  const { t } = useTranslation('home-events'); // Use the new home-events namespace
  const router = useRouter();
  const pathname = usePathname();
  const clearPath = pathname
    .split('/')
    .slice(2, pathname.split('/').length)
    .join('/');
  console.log(clearPath);
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      // Optionally clear   /localStorage here
      router.push('/');
    } catch (err) {
      // Handle error (toast, etc.)
      console.error('Logout failed', err);
    }
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarHeader}>
        <img src="/svg/events/sidebar-logo.svg" alt="logo" />
      </div>
      <nav className={styles.menu}>
        <ul>
          <li>
            <Link
              className={`${styles.menuLink} ${
                clearPath === 'host' ? styles.active : ''
              }`}
              href="/host"
            >
              <img
                src="/svg/events/dashboard-icon.svg"
                alt="dashboard"
                className={styles.icon}
              />
              <span>{t('sidebar.dashboard', 'لوحة التحكم')}</span>
            </Link>
          </li>
          <li>
            <Link className={styles.menuLink} href="/host/events">
              <img
                src="/svg/auth/calendar.svg"
                alt="events"
                className={styles.icon}
              />
              <span>{t('sidebar.events', 'المناسبات')}</span>
            </Link>
          </li>
          <li>
            <Link className={styles.menuLink} href="/host/settings">
              <img
                src="/svg/events/setting.svg"
                alt="settings"
                className={styles.icon}
              />
              <span>{t('sidebar.settings', 'الإعدادات')}</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.planBox}>
        {/* No crown icon available, use emoji as placeholder */}
        <div className={styles.planHeader}>
          <span role="img" aria-label="crown">
            <img src="/svg/events/crown.svg" alt="crown" />
          </span>
          <span>{t('sidebar.freePlan', 'خطة مجانية')}</span>
        </div>
        <div className={styles.planDesc}>
          {t('sidebar.freePlanDesc', 'اشترك لإرسال دعوات غير محدودة')}
        </div>
        <button className={styles.upgradeBtn}>
          {t('sidebar.upgradeNow', 'ترقية الآن')}
        </button>
      </div>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        {/* No logout icon available, use emoji as placeholder */}
        <span role="img" aria-label="logout">
          <img src="/svg/events/logout.svg" alt="logout" />
        </span>
        <span>{t('sidebar.logout', 'تسجيل خروج')}</span>
      </button>
    </div>
  );
}

export default Sidebar;
