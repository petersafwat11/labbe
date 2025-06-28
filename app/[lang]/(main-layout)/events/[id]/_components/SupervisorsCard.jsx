import React from 'react';
import CardLayout from '@/ui/commen/card/CardLayout';
import Button from '@/ui/commen/button/Button';
import { supervisors } from '@/staticData/events/data';
import styles from '../singleEvent.module.css';

export default function SupervisorsCard() {
  return (
    <CardLayout
      style={{
        flex: 1,
        justifyContent: 'space-between',
        marginTop: '24px',
      }}
      className={styles.supervisorsCard}
    >
      <div style={{ width: '100%' }}>
        <div className={styles.sectionTitle}>المشرفون</div>
        {supervisors.map((sup, idx) => (
          <div className={styles.supervisorRow} key={idx}>
            {sup.isMain && (
              <img
                src="/svg/events/crown.svg"
                alt="crown"
                style={{ width: 18, height: 18 }}
              />
            )}
            <div className={styles.supervisorInfo}>
              <span className={styles.supervisorName}>{sup.name}</span>
              <span className={styles.supervisorPhone}>{sup.phone}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ width: '100%' }}>
        <Button
          variant="secondary"
          title="أضف مشرفين"
          className={styles.addSupervisorBtn}
          icon="/svg/events/people.svg"
        />
      </div>
    </CardLayout>
  );
}
