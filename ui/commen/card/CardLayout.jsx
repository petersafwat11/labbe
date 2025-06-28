import React from 'react';
import styles from './cardLayout.module.css';
function CardLayout({ children, className, ...props }) {
  const { iconPath, iconAlt, iconBox, ...rest } = props;
  const cardClasses = `${styles.card} ${className || ''}`;
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardLayout;
