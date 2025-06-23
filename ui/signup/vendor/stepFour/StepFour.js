import React from 'react';
import styles from './stepFour.module.css';
import SectionTitle, { StepTitle } from '@/ui/commen/title/SectionTitle';
import { useTranslation } from 'react-i18next';
import CheckBoxItems from '@/ui/commen/inputs/checkboxItems/CheckBoxItems';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';

const StepFour = ({ goToPreviousStep }) => {
  const { t } = useTranslation('signup');

  const paymentMechanismOptions = t(
    'signupForm.vendor.paymentData.payment_type.options',
    { returnObjects: true }
  );

  const paymentOptions = t(
    'signupForm.vendor.paymentData.payment_options_list.options',
    { returnObjects: true }
  );

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.vendor.paymentData.title')}
        description={t('signupForm.vendor.paymentData.description')}
        onArrowClick={goToPreviousStep}
      />
      <div className={styles.sections}>
        {/* <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.paymentData.paymentMechanism.title')}
            icon="/svg/auth/calendar-2.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              name="paymentData.payment_type"
              items={paymentMechanismOptions}
              columns={1}
              singleMode={true}
            />
          </div>


          <InputGroup
            name="paymentData.termsForRefund"
            placeholder={t(
              'signupForm.vendor.paymentData.termsForRefund.placeholder'
            )}
            iconPath="/auth/location-2.svg"
            type="text"
          />
        </div> */}

        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.paymentData.paymentOptions.title')}
            icon="/svg/auth/calendar-2.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              name="paymentData.paymentOptions"
              items={paymentOptions}
              columns={1}
            />
          </div>

          <InputGroup
            name="paymentData.termsForRefund"
            placeholder={t(
              'signupForm.vendor.paymentData.termsForRefund.placeholder'
            )}
            iconPath="/auth/location-2.svg"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default StepFour;
