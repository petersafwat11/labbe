'use client';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './popup.module.css';
function PopupLayout({ children, isOpen, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      setTimeout(() => {
        setShow(false);
        document.body.style.overflow = ''; // Restore scrolling
      }, 300); // Wait for fade-out animation
    }

    return () => {
      document.body.style.overflow = ''; // Ensure scrolling is restored on unmount
    };
  }, [isOpen]);

  if (!show && !isOpen) return null;
  return ReactDOM.createPortal(
    <div onClick={onClose} className={styles.popupLayout}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.popupLayoutContent}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export default PopupLayout;
