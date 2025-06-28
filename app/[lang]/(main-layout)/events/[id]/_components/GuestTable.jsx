import React from 'react';
import CardLayout from '@/ui/commen/card/CardLayout';
import Button from '@/ui/commen/button/Button';
import DynamicTable from '@/ui/table';
import { singleEventColumns } from '@/ui/table/columns/single-event-columns';
import { guestData } from '@/staticData/events/data';
import styles from '../singleEvent.module.css';

export default function GuestTable() {
  return (
    <div className={styles.rightCol}>
      <CardLayout className={styles.guestTableCol}>
        <div className={styles.tableHeadSection}>
          <div className={styles.tableHeadTitle}>قائمة الضيوف</div>
          <div className={styles.tableHeadActions}>
            <Button
              variant="gray"
              title="تصفية"
              icon="/svg/events/filter.svg"
            />
            <Button
              variant="gray"
              title="تصدير البيانات"
              icon="/svg/events/export-2.svg"
            />
            <Button variant="gray" title="المزيد" icon="/svg/events/more.svg" />
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <DynamicTable columns={singleEventColumns} data={guestData} />
        </div>
      </CardLayout>
    </div>
  );
}
