'use client';
import React from 'react';
import styles from './page.module.css';
import ImageCarousel from '@/ui/commen/imageCarousel/ImageCarousel';
import { useMediaQuery } from '@/hooks/use-media-query';
import { usePathname } from 'next/navigation';

const Page = ({ children }) => {
  const isLg = useMediaQuery('(min-width: 1024px)');
  const pathname = usePathname();

  const shouldShowSlider = !pathname.includes('/signup/continue-signup');

  console.log('Current Pathname:', pathname);
  console.log('Should Show Slider:', shouldShowSlider);

  return (
    <div className={'page'}>
      <div className={styles.container}>
        <div className={styles.right}>{children}</div>
        {isLg && shouldShowSlider && (
          <div className={styles.left}>
            <ImageCarousel />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
