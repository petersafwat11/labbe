'use client';
import React from 'react';
import styles from './createEvent.module.css';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import InputSelect from '@/ui/commen/inputs/inputGroup/InputSelect';
import DatePicker from '@/ui/commen/inputs/datePicker';
import TimePicker from '@/ui/commen/inputs/TimePicker';
import MapInput from '@/ui/commen/inputs/MapInput';
import { useTranslation } from 'react-i18next';
import { StepTitle } from '@/ui/commen/title/SectionTitle';

function Step1() {
  const { t } = useTranslation('createEvent');
  return (
    <>
      <StepTitle
        title={t('event_details')}
        description={t('event_details_description')}
      />
      <div className={styles.formFields}>
        <div className={styles.row}>
          <InputGroup
            label={t('title_label')}
            placeholder={t('title_placeholder')}
            name="eventDetails.title"
            type="text"
            required
          />
          <InputSelect
            label={t('type_label')}
            placeholder={t('type_placeholder')}
            name="eventDetails.type"
            required
            options={[
              { label: t('type_option_event'), value: 'event' },
              { label: t('type_option_meeting'), value: 'meeting' },
            ]}
          />
        </div>

        <div className={styles.row}>
          <DatePicker
            name="eventDetails.date"
            label={t('date_label')}
            placeholder={t('date_placeholder')}
            required
            minDate={new Date()}
            maxDate={new Date(2025, 11, 31)}
          />
          <TimePicker
            label={t('time_label')}
            name="eventDetails.time"
            required
            hintMessage={t('time_hint')}
            validations={[]}
          />
        </div>
        <MapInput
          name="eventDetails.location"
          label={t('location_label')}
          required
          hintMessage={t('location_hint')}
        />
      </div>
    </>
  );
}

export default Step1;
