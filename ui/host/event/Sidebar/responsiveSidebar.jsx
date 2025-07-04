'use client';
import { useMediaQuery } from '@/hooks/use-media-query';
import React, { useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import styles from './sidebar.module.css';
import useSidebarStore from '@/stores/sidebarStore';

function ResponsiveSidebar() {
  const { isOpen, setIsOpen } = useSidebarStore();
  const sidebarRef = useRef(null);

  const isLg = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isLg) {
    return (
      <>
        {/* Mobile sidebar overlay */}
        {isOpen && (
          <div
            className={styles.mobileOverlay}
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        <div
          ref={sidebarRef}
          className={`${styles.mobileContainer} ${isOpen ? styles.active : ''}`}
        >
          <Sidebar />
        </div>
      </>
    );
  }
  return <Sidebar />;
}

export default ResponsiveSidebar;
