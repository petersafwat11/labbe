'use client';
import React, { useState } from 'react';
import Stepper from '../../commen/stepper/Stepper';
import styles from './whiteLabelform.module.css';
import FormHeader from '@/ui/commen/formHeader/FormHeader';
import StepOne from './stepOne/StepOne';
import StepTwo from './stepTwo/StepTwo';
import StepFour from './stepFour/StepFour';
import StepFive from './stepFive/StepFive';
import StepThree from './stepThreee/StepThree';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTranslation } from 'react-i18next';

const WhiteLabelForm = () => {
  const { t } = useTranslation('signup');
  const [step, setStep] = useState(1);
  const steps = [
    { id: 1, desc: t('signupForm.whiteLabel.steps.identity') },
    { id: 2, desc: t('signupForm.whiteLabel.steps.login') },
    { id: 3, desc: t('signupForm.whiteLabel.steps.requirements') },
    { id: 4, desc: t('signupForm.whiteLabel.steps.services') },
    { id: 5, desc: t('signupForm.whiteLabel.steps.payment') },
  ];
  const isLg = useMediaQuery('(min-width: 1024px)');
  const [whiteLabelData, setWhiteLabelData] = useState({
    identity: {
      arabic_name: { value: '', error: '' },
      english_name: { value: '', error: '' },
      logo: { value: '', error: '' },
      primaryColor: { value: '#c28e5c', error: '' },
      secondaryColor: { value: '#d6b392', error: '' },
      fontFamily: { value: '', error: '' },
    },
    loginData: {
      email: { value: '', error: '' },
      domain: { value: '', error: '' },
    },
    systemRequirements: {
      numberOfEvents: { value: '', error: '' },
      numberOfGuestsPerEvent: { value: '', error: '' },
      eventsTypes: { value: [], error: '' },
      services: { value: [], error: '' },
    },
    additionalServices: [],
    paymentData: {
      companyName: { value: '', error: '' },
      licenseNumber: { value: '', error: '' },
      TaxNumber: { value: '', error: '' },
      city: { value: '', error: '' },
      neighborhood: { value: '', error: '' },
      street: { value: '', error: '' },
      buildingNumber: { value: '', error: '' },
      additionalNumber: { value: '', error: '' },
      placeType: { value: '', error: '' },
      placeNumber: { value: '', error: '' },
      paymentMethod: { value: [], error: '' },
    },
  });

  return (
    <div className={styles.container}>
      {/* <div className={styles.form_header}>
        <FormHeader />
      </div> */}
      {isLg && (
        <div className={styles.stepper_container}>
          <Stepper step={step} setStep={setStep} steps={steps} />
        </div>
      )}

      <div className={styles.page_content}>
        <div className={styles.top_text}>
          <h2 className={styles.top_text_title}>
            {t('signupForm.whiteLabel.title')}
          </h2>
          <p className={styles.top_text_description}>
            {t('signupForm.whiteLabel.description')}
          </p>
        </div>
        {!isLg && <Stepper step={step} setStep={setStep} steps={steps} />}
        <div className={styles.page_container}>
          <div className={styles.form_container}>
            <div className={styles.form_content}>
              <div className={styles.step_container}>
                {step === 1 ? (
                  <StepOne
                    whiteLabelData={whiteLabelData}
                    setWhiteLabelData={setWhiteLabelData}
                  />
                ) : step === 2 ? (
                  <StepTwo
                    whiteLabelData={whiteLabelData}
                    setWhiteLabelData={setWhiteLabelData}
                  />
                ) : step === 3 ? (
                  <StepThree
                    whiteLabelData={whiteLabelData}
                    setWhiteLabelData={setWhiteLabelData}
                  />
                ) : step === 4 ? (
                  <StepFour
                    whiteLabelData={whiteLabelData}
                    setWhiteLabelData={setWhiteLabelData}
                  />
                ) : step === 5 ? (
                  <StepFive
                    whiteLabelData={whiteLabelData}
                    setWhiteLabelData={setWhiteLabelData}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelForm;
