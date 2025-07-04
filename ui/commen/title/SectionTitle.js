import React from 'react';
import styles from './title.module.css';
import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useMediaQuery } from '@/hooks/use-media-query';

const SectionTitle = ({ title, icon, height, width }) => {
  return (
    <h3 className={styles.section_title}>
      {icon && (
        <Image
          src={icon ?? '/svg/auth/document-copy.svg'}
          alt=""
          width={width}
          height={height}
        />
      )}
      {title}
    </h3>
  );
};

export default SectionTitle;

export const StepTitle = ({ title, description, onArrowClick }) => {
  // console.log('onArrowClick prop in StepTitle:', onArrowClick);
  const isLg = useMediaQuery('(min-width: 1024px)');
  return (
    <div className={styles.step_text}>
      <h3 className={styles.step_title}>
        {onArrowClick && (
          <button className={styles.step_arrow_button} onClick={onArrowClick}>
            <FaArrowRightLong
              className={styles.step_arrow_icon}
              size={isLg ? 16 : 12}
            />
          </button>
        )}
        {title}
      </h3>
      <p className={styles.step_description}>{description}</p>
    </div>
  );
};
