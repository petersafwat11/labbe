import React from 'react';
import Header from '@/ui/host/event/Header/Header';
import styles from './layout.module.css';
import ResponsiveSidebar from '@/ui/host/event/Sidebar/responsiveSidebar';

function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <ResponsiveSidebar />
      <div className={styles.contentWithHeader}>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
