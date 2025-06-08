import React from 'react';
import styles from './stepThree.module.css';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import { StepTitle } from '../title/SectionTitle';
import SectionTitle from '../title/SectionTitle';
import CheckBoxItems from '@/ui/commen/checkboxItems/CheckBoxItems';
import { useTranslation } from 'react-i18next';

const StepThree = ({ whiteLabelData, setWhiteLabelData }) => {
  const { t } = useTranslation('signup');

  const handleInputChange = (section, field, value) => {
    setWhiteLabelData({
      ...whiteLabelData,
      [section]: {
        ...whiteLabelData[section],
        [field]: { value, error: '' },
      },
    });
  };

  const handleCheckboxChange = (section, field, item, checked) => {
    const currentValues = whiteLabelData[section][field].value;
    let newValues;

    if (checked) {
      // Add item if checked
      newValues = [...currentValues, item];
    } else {
      // Remove item if unchecked
      newValues = currentValues.filter((value) => value !== item);
    }

    setWhiteLabelData({
      ...whiteLabelData,
      [section]: {
        ...whiteLabelData[section],
        [field]: { value: newValues, error: '' },
      },
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.whiteLabel.requirements.title')}
        description={t('signupForm.whiteLabel.requirements.description')}
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
                'signupForm.whiteLabel.requirements.fields.events.label'
              )}
              type="number"
              placeholder={t(
                'signupForm.whiteLabel.requirements.fields.events.placeholder'
              )}
              required
              name="numberOfEvents"
              value={whiteLabelData.systemRequirements.numberOfEvents.value}
              onChange={(e) =>
                handleInputChange(
                  'systemRequirements',
                  'numberOfEvents',
                  e.target.value
                )
              }
              error={whiteLabelData.systemRequirements.numberOfEvents.error}
              iconPath="auth/calendar.svg"
            />
            <InputGroup
              label={t(
                'signupForm.whiteLabel.requirements.fields.guests.label'
              )}
              type="number"
              placeholder={t(
                'signupForm.whiteLabel.requirements.fields.guests.placeholder'
              )}
              required
              name="numberOfGuestsPerEvent"
              value={
                whiteLabelData.systemRequirements.numberOfGuestsPerEvent.value
              }
              onChange={(e) =>
                handleInputChange(
                  'systemRequirements',
                  'numberOfGuestsPerEvent',
                  e.target.value
                )
              }
              error={
                whiteLabelData.systemRequirements.numberOfGuestsPerEvent.error
              }
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
              checkedItems={whiteLabelData.systemRequirements.eventsTypes.value}
              onChange={(item, checked) =>
                handleCheckboxChange(
                  'systemRequirements',
                  'eventsTypes',
                  item,
                  checked
                )
              }
            />
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
              checkedItems={whiteLabelData.systemRequirements.services.value}
              onChange={(item, checked) =>
                handleCheckboxChange(
                  'systemRequirements',
                  'services',
                  item,
                  checked
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
