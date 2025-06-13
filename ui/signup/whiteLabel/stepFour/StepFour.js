import React, { useEffect } from 'react';
import styles from './stepFour.module.css';
import { StepTitle } from '../title/SectionTitle';
import SectionTitle from '../title/SectionTitle';
import CheckBoxItems from '@/ui/commen/checkboxItems/CheckBoxItems';
import { useTranslation } from 'react-i18next';

const StepFour = ({ whiteLabelData, setWhiteLabelData, onStepValidationChange, goToPreviousStep }) => {
  const { t } = useTranslation('signup');

  const validateStepFour = (data) => {
    return data.additionalServices.length > 0;
  };

  const handleCheckboxChange = (item, checked) => {
    setWhiteLabelData((prevData) => {
      const currentValues = prevData.additionalServices;
    let newValues;

    if (checked) {
      newValues = [...currentValues, item];
    } else {
      newValues = currentValues.filter((value) => value !== item);
    }

      const newData = {
        ...prevData,
      additionalServices: newValues,
      };
      onStepValidationChange(validateStepFour(newData));
      return newData;
    });
  };

  useEffect(() => {
    onStepValidationChange(validateStepFour(whiteLabelData));
  }, [whiteLabelData, onStepValidationChange]);

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.whiteLabel.services.title')}
        description={t('signupForm.whiteLabel.services.description')}
        onArrowClick={() => {
          console.log('StepFour previous arrow clicked!');
          goToPreviousStep();
        }}
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.whiteLabel.services.title')}
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t('signupForm.whiteLabel.services.options', {
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
