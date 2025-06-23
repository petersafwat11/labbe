import React from 'react';
import styles from './stepFive.module.css';
import SectionTitle, { StepTitle } from '@/ui/commen/title/SectionTitle';
import { useTranslation } from 'react-i18next';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import CheckBoxItems from '@/ui/commen/inputs/checkboxItems/CheckBoxItems';

const StepFive = ({ goToPreviousStep }) => {
  const { t } = useTranslation('signup');
  const paymentMethodOptions = t(
    'signupForm.vendor.paymentData.paymentMethods.options',
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
        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.paymentData.company.title')}
            icon="/svg/auth/building-1.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              name="commercialVerification.company.name"
              label={t(
                'signupForm.vendor.paymentData.company.fields.name.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.company.fields.name.placeholder'
              )}
              type="text"
              iconPath={'/auth/building.svg'}
            />
            <InputGroup
              name="commercialVerification.company.license"
              label={t(
                'signupForm.vendor.paymentData.company.fields.license.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.company.fields.license.placeholder'
              )}
              type="text"
              iconPath={'/auth/document.svg'}
            />
            <InputGroup
              name="commercialVerification.company.tax"
              label={t(
                'signupForm.vendor.paymentData.company.fields.tax.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.company.fields.tax.placeholder'
              )}
              type="text"
              iconPath={'/auth/document.svg'}
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.paymentData.address.title')}
            icon="/svg/auth/location-2.svg"
            height={24}
            width={24}
          />
          <div className={styles.grid_inputs}>
            <InputGroup
              name="commercialVerification.address.city"
              label={t(
                'signupForm.vendor.paymentData.address.fields.city.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.address.fields.city.placeholder'
              )}
              type="text"
              iconPath={'/auth/location-2.svg'}
            />
            <InputGroup
              name="commercialVerification.address.neighborhood"
              label={t(
                'signupForm.vendor.paymentData.address.fields.neighborhood.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.address.fields.neighborhood.placeholder'
              )}
              type="text"
              iconPath={'/auth/location-2.svg'}
            />
            <InputGroup
              name="commercialVerification.address.street"
              label={t(
                'signupForm.vendor.paymentData.address.fields.street.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.address.fields.street.placeholder'
              )}
              type="text"
              className={styles.full_width}
              iconPath={'/auth/location-2.svg'}
            />
            <InputGroup
              name="commercialVerification.address.buildingNumber"
              label={t(
                'signupForm.vendor.paymentData.address.fields.buildingNumber.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.address.fields.buildingNumber.placeholder'
              )}
              type="text"
              iconPath={'/auth/location-2.svg'}
            />
            <InputGroup
              name="commercialVerification.address.additionalNumber"
              label={t(
                'signupForm.vendor.paymentData.address.fields.additionalNumber.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.address.fields.additionalNumber.placeholder'
              )}
              type="text"
              iconPath={'/auth/location-2.svg'}
            />
            <InputGroup
              name="commercialVerification.address.postalCode"
              label={t(
                'signupForm.vendor.paymentData.address.fields.postalCode.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.address.fields.postalCode.placeholder'
              )}
              type="text"
              iconPath={'/auth/location-2.svg'}
            />
            <InputGroup
              name="commercialVerification.address.unitType"
              label={t(
                'signupForm.vendor.paymentData.address.fields.unitType.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.address.fields.unitType.placeholder'
              )}
              type="text"
              iconPath={'/auth/location-2.svg'}
            />
            <InputGroup
              name="commercialVerification.address.unitNumber"
              label={t(
                'signupForm.vendor.paymentData.address.fields.unitNumber.label'
              )}
              placeholder={t(
                'signupForm.vendor.paymentData.address.fields.unitNumber.placeholder'
              )}
              type="text"
              iconPath={'/auth/location-2.svg'}
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t('signupForm.vendor.paymentData.paymentMethods.title')}
            icon="/svg/auth/moneys.svg"
            height={24}
            width={24}
          />
          <CheckBoxItems
            name="commercialVerification.paymentMethods"
            items={paymentMethodOptions}
            columns={3}
          />
        </div>
      </div>
    </div>
  );
};

export default StepFive;
