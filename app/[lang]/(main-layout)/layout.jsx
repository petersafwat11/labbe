import React from 'react';
import Sidebar from '@/ui/layouts/event/Sidebar/Sidebar';
import Header from '@/ui/layouts/event/Header/Header';
import styles from './layout.module.css';

function Layout({ children }) {
  return (
    <div dir="rtl" className={styles.layoutContainer}>
      <Sidebar />
      <div className={styles.contentWithHeader}>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
