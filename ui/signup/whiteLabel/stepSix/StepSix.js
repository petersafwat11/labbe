import React, { useEffect } from 'react';
import styles from './stepSix.module.css';
import { StepTitle } from '../../../commen/title/SectionTitle';
import SummarySection from './SummarySection';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

const StepSix = ({
  // whiteLabelData,
  // setWhiteLabelData,
  // onStepValidationChange,
  goToPreviousStep,
}) => {
  const { t } = useTranslation('signup');
  const { watch } = useFormContext();
  const whiteLabelData = watch();
  // useEffect(() => {
  //   // Summary step is always considered valid to allow moving to the next step (submission)
  //   onStepValidationChange(true);
  // }, [onStepValidationChange]);

  return (
    <div className={styles.container}>
      <StepTitle
        title={t('signupForm.whiteLabel.summary.title')}
        description={t('signupForm.whiteLabel.summary.description')}
        onArrowClick={() => {
          console.log('StepSix previous arrow clicked!');
          goToPreviousStep();
        }}
      />

      <div className={styles.sections}>
        {/* Identity Summary */}
        <SummarySection
          title={t('signupForm.whiteLabel.identity.title')}
          // icon="/svg/auth/user.svg"
          data={whiteLabelData.identity}
          fields={[
            {
              key: 'arabic_name',
              label: t('signupForm.whiteLabel.identity.arabicName.label'),
              type: 'text',
            },
            {
              key: 'english_name',
              label: t('signupForm.whiteLabel.identity.englishName.label'),
              type: 'text',
            },
            {
              key: 'logo',
              label: t('signupForm.whiteLabel.identity.logo.title'),
              type: 'logo',
            },
            {
              key: 'primaryColor',
              label: t('signupForm.whiteLabel.identity.primaryColor.label'),
              type: 'color',
            },
            {
              key: 'secondaryColor',
              label: t('signupForm.whiteLabel.identity.secondaryColor.label'),
              type: 'color',
            },
            {
              key: 'fontFamily',
              label: t('signupForm.whiteLabel.identity.fontFamily.label'),
              type: 'text',
            },
          ]}
        />

        {/* Login Data Summary */}
        <SummarySection
          title={t('signupForm.whiteLabel.login.title')}
          // icon="/svg/auth/email.svg"
          data={whiteLabelData.loginData}
          fields={[
            {
              key: 'email',
              label: t('signupForm.whiteLabel.login.fields.email.label'),
              type: 'text',
            },
            {
              key: 'domain',
              label: t('signupForm.whiteLabel.login.fields.domain.label'),
              type: 'text',
            },
          ]}
        />

        {/* System Requirements Summary */}
        <SummarySection
          title={t('signupForm.whiteLabel.requirements.title')}
          // icon="/svg/auth/settings.svg"
          data={whiteLabelData.systemRequirements}
          fields={[
            {
              key: 'numberOfEvents',
              label: t(
                'signupForm.whiteLabel.requirements.fields.numberOfEvents.label'
              ),
              type: 'text',
            },
            {
              key: 'numberOfGuestsPerEvent',
              label: t(
                'signupForm.whiteLabel.requirements.fields.numberOfGuestsPerEvent.label'
              ),
              type: 'text',
            },
            {
              key: 'eventsTypes',
              label: t(
                'signupForm.whiteLabel.requirements.fields.eventsTypes.label'
              ),
              type: 'array',
            },
            {
              key: 'services',
              label: t(
                'signupForm.whiteLabel.requirements.fields.services.label'
              ),
              type: 'array',
            },
          ]}
        />

        {/* Additional Services Summary */}
        {whiteLabelData.additionalServices &&
          whiteLabelData.additionalServices.length > 0 && (
            <SummarySection
              title={t('signupForm.whiteLabel.services.title')}
              // icon="/svg/auth/services.svg"
              data={{ additionalServices: whiteLabelData.additionalServices }}
              fields={[
                {
                  key: 'additionalServices',
                  label: t('signupForm.whiteLabel.services.selectedServices'),
                  type: 'array',
                },
              ]}
            />
          )}

        {/* Payment Data Summary */}
        <SummarySection
          title={t('signupForm.whiteLabel.payment.title')}
          //    icon="/svg/auth/payment.svg"
          data={whiteLabelData.paymentData}
          fields={[
            {
              key: 'companyName',
              label: t(
                'signupForm.whiteLabel.payment.company.fields.name.label'
              ),
              type: 'text',
            },
            {
              key: 'licenseNumber',
              label: t(
                'signupForm.whiteLabel.payment.company.fields.license.label'
              ),
              type: 'text',
            },
            {
              key: 'TaxNumber',
              label: t(
                'signupForm.whiteLabel.payment.company.fields.tax.label'
              ),
              type: 'text',
            },
            {
              key: 'city',
              label: t(
                'signupForm.whiteLabel.payment.address.fields.city.label'
              ),
              type: 'text',
            },
            {
              key: 'neighborhood',
              label: t(
                'signupForm.whiteLabel.payment.address.fields.neighborhood.label'
              ),
              type: 'text',
            },
            {
              key: 'street',
              label: t(
                'signupForm.whiteLabel.payment.address.fields.street.label'
              ),
              type: 'text',
            },
            {
              key: 'buildingNumber',
              label: t(
                'signupForm.whiteLabel.payment.address.fields.buildingNumber.label'
              ),
              type: 'text',
            },
            {
              key: 'additionalNumber',
              label: t(
                'signupForm.whiteLabel.payment.address.fields.additionalNumber.label'
              ),
              type: 'text',
            },
            {
              key: 'placeType',
              label: t(
                'signupForm.whiteLabel.payment.address.fields.placeType.label'
              ),
              type: 'text',
            },
            {
              key: 'placeNumber',
              label: t(
                'signupForm.whiteLabel.payment.address.fields.placeNumber.label'
              ),
              type: 'text',
            },
            {
              key: 'paymentMethod',
              label: t('signupForm.whiteLabel.payment.paymentMethods.title'),
              type: 'array',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default StepSix;
