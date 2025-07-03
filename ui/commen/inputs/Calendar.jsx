'use client';
import React from 'react';
import { DayPicker } from 'react-day-picker';
import styles from './Calendar.module.css';
import Image from 'next/image';

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  layout = 'horizontal',
  ...props
}) => {
  const IconLeft = () => (
    <Image
      src="/svg/events/back-arrow.svg"
      alt="previous"
      width={16}
      height={16}
    />
  );

  const IconRight = () => (
    <Image src="/svg/events/right.svg" alt="next" width={16} height={16} />
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      //   className={`${styles.calendar} ${className || ''}`}
      classNames={{
        months: `${styles.months} ${
          layout === 'horizontal' ? styles.months_horizontal : ''
        }`,
        month: styles.month,
        caption: styles.caption,
        caption_label: styles.caption_label,
        nav: styles.nav,
        nav_button: styles.nav_button,
        nav_button_previous: styles.nav_button_previous,
        nav_button_next: styles.nav_button_next,
        table: styles.table,
        head_row: styles.head_row,
        head_cell: styles.head_cell,
        row: styles.row,
        cell: styles.cell,
        day: styles.day,
        day_selected: styles.day_selected,
        day_today: styles.day_today,
        day_outside: styles.day_outside,
        day_disabled: styles.day_disabled,
        day_range_middle: styles.day_range_middle,
        day_hidden: styles.day_hidden,
        ...classNames,
      }}
      components={{
        IconLeft,
        IconRight,
      }}
      {...props}
    />
  );
};

Calendar.displayName = 'Calendar';

export default Calendar;
