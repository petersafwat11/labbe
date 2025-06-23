'use client';
import React, { useEffect } from 'react';
import styles from './stepThree.module.css';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import { StepTitle } from '../../../commen/title/SectionTitle';
import SectionTitle from '../../../commen/title/SectionTitle';
import CheckBoxItems from '@/ui/commen/inputs/checkboxItems/CheckBoxItems';
import { useTranslation } from 'react-i18next';

const StepThree = ({ goToPreviousStep }) => {
  const { t } = useTranslation('signup');

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.whiteLabel.requirements.title')}
        description={t('signupForm.whiteLabel.requirements.description')}
        onArrowClick={() => {
          console.log('StepThree previous arrow clicked!');
          goToPreviousStep();
        }}
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.requirements.usage.title')}
            icon="/svg/auth/usage.svg"
            height={24}
            width={24}
          />

          <div className={styles.row}>
            <InputGroup
              label={t(
                'signupForm.whiteLabel.requirements.fields.numberOfEvents.label'
              )}
              type="number"
              placeholder={t(
                'signupForm.whiteLabel.requirements.fields.events.placeholder'
              )}
              required
              name="systemRequirements.numberOfEvents"
              iconPath="auth/calendar.svg"
            />
            <InputGroup
              label={t(
                'signupForm.whiteLabel.requirements.fields.numberOfGuestsPerEvent.label'
              )}
              type="number"
              placeholder={t(
                'signupForm.whiteLabel.requirements.fields.guests.placeholder'
              )}
              required
              name="systemRequirements.numberOfGuestsPerEvent"
              iconPath="auth/people.svg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.requirements.eventTypes.title')}
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />

          <div className={styles.options}>
            <CheckBoxItems
              items={t(
                'signupForm.whiteLabel.requirements.eventTypes.options',
                { returnObjects: true }
              )}
              name="systemRequirements.eventsTypes"
              // checkedItems={whiteLabelData.systemRequirements.eventsTypes.value}

              columns={2}
            />

            {/* <CheckBoxItems items={optionsArray} name="yourFieldName"  /> */}
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t(
              'signupForm.whiteLabel.requirements.systemIntegration.title'
            )}
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />

          <div className={styles.options}>
            <CheckBoxItems
              items={t(
                'signupForm.whiteLabel.requirements.systemIntegration.options',
                { returnObjects: true }
              )}
              name={'systemRequirements.services'}
              columns={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
