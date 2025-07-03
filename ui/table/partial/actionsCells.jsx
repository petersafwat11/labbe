import React from 'react';
import Link from 'next/link';
import styles from './partial.module.css';

export function ActionCellLayout({ children }) {
  return <div className={styles.actionCellLayout}>{children}</div>;
}

export function LinkActionCell({ href, title }) {
  return (
    <Link href={href} className={styles.linkActionCell}>
      {title}
    </Link>
  );
}

export function DeleteActionCell({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={styles.deleteActionCell}>
      <img src="/svg/events/trash.svg" alt="delete" />
    </button>
  );
}

export function EditActionCell({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={styles.editActionCell}>
      تعديل
    </button>
  );
}
