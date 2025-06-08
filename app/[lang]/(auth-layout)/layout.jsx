'use client';
import React from 'react';
import styles from './page.module.css';
import ImageCarousel from '@/ui/commen/imageCarousel/ImageCarousel';
import { useMediaQuery } from '@/hooks/use-media-query';
const Page = ({ children }) => {
  const isLg = useMediaQuery('(min-width: 1024px)');

  return (
    <div className={'page'}>
      <div className={styles.container}>
        <div className={styles.right}>{children}</div>
        {isLg && (
          <div className={styles.left}>
            <ImageCarousel />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
