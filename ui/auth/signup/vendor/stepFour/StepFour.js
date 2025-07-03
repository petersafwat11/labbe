import React from 'react';
import styles from './stepFour.module.css';
import SectionTitle, { StepTitle } from '@/ui/commen/title/SectionTitle';
import { useTranslation } from 'react-i18next';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import UploadFile from '@/ui/commen/inputs/uploadFile/UploadFile';

const StepFour = ({ goToPreviousStep }) => {
  const { t } = useTranslation('signup');

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.vendor.steps.commercialVerification')}
        description={t(
          'signupForm.vendor.steps.commercialVerificationDescription'
        )}
        onArrowClick={goToPreviousStep}
      />
      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title={t(
              'signupForm.vendor.commercialVerification.commercialRecord.title'
            )}
            icon="/svg/auth/building-1.svg"
            height={24}
            width={24}
          />
          <UploadFile
            name="commercialVerification.commercialRecord"
            multiple={false}
            placeholder={t(
              'signupForm.vendor.commercialVerification.commercialRecord.placeholder'
            )}
          />
        </div>
        <div className={styles.section}>
          <SectionTitle
            title={t(
              'signupForm.vendor.commercialVerification.nationalId.title'
            )}
            icon="/svg/auth/building-1.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              name="commercialVerification.nationalId"
              label={t(
                'signupForm.vendor.commercialVerification.nationalId.label'
              )}
              placeholder={t(
                'signupForm.vendor.commercialVerification.nationalId.placeholder'
              )}
              type="text"
              iconPath={'/auth/building.svg'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
