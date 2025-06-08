import React from 'react';
import styles from './stepFour.module.css';
import { StepTitle } from '../title/SectionTitle';
import SectionTitle from '../title/SectionTitle';
import CheckBoxItems from '@/ui/commen/checkboxItems/CheckBoxItems';
import { useTranslation } from 'react-i18next';

const StepFour = ({ whiteLabelData, setWhiteLabelData }) => {
  const { t } = useTranslation('signup');

  const handleCheckboxChange = (item, checked) => {
    const currentValues = whiteLabelData.additionalServices;
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
      additionalServices: newValues,
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.whiteLabel.additionalServices.title')}
        description={t('signupForm.whiteLabel.additionalServices.description')}
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.additionalServices.title')}
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t('signupForm.whiteLabel.additionalServices.options', {
                returnObjects: true,
              })}
              checkedItems={whiteLabelData.additionalServices}
              onChange={handleCheckboxChange}
              columns={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
