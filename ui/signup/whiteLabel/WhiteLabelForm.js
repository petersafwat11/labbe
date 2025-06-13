'use client';
import React, { useState, useCallback } from 'react';
import Stepper from '../../commen/stepper/Stepper';
import styles from './whiteLabelform.module.css';
import FormHeader from '@/ui/commen/formHeader/FormHeader';
import StepOne from './stepOne/StepOne';
import StepTwo from './stepTwo/StepTwo';
import StepFour from './stepFour/StepFour';
import StepFive from './stepFive/StepFive';
import StepThree from './stepThreee/StepThree';
import StepSix from './stepSix/StepSix';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTranslation } from 'react-i18next';
import { FaArrowLeftLong } from 'react-icons/fa6';

const WhiteLabelForm = () => {
  const { t } = useTranslation('signup');
  const [step, setStep] = useState(1);
  const [currentStepValidity, setCurrentStepValidity] = useState(false);
  const steps = [
    { id: 1, desc: t('signupForm.whiteLabel.steps.identity') },
    { id: 2, desc: t('signupForm.whiteLabel.steps.login') },
    { id: 3, desc: t('signupForm.whiteLabel.steps.requirements') },
    { id: 4, desc: t('signupForm.whiteLabel.steps.services') },
    { id: 5, desc: t('signupForm.whiteLabel.steps.payment') },
    { id: 6, desc: t('signupForm.whiteLabel.steps.summary') },
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

  const initialStepOneData = React.useMemo(() => ({
    arabic_name: whiteLabelData.identity.arabic_name.value,
    english_name: whiteLabelData.identity.english_name.value,
    logo: whiteLabelData.identity.logo.value,
    primaryColor: whiteLabelData.identity.primaryColor.value,
    secondaryColor: whiteLabelData.identity.secondaryColor.value,
    fontFamily: whiteLabelData.identity.fontFamily.value,
  }), [whiteLabelData.identity]);

  const handleStepOneComplete = (data) => {
    setWhiteLabelData((prevData) => {
      let identityChanged = false;
      const newIdentity = {};

      if (data.arabic_name !== prevData.identity.arabic_name.value) {
        newIdentity.arabic_name = { value: data.arabic_name, error: '' };
        identityChanged = true;
      } else {
        newIdentity.arabic_name = prevData.identity.arabic_name;
      }

      if (data.english_name !== prevData.identity.english_name.value) {
        newIdentity.english_name = { value: data.english_name, error: '' };
        identityChanged = true;
      } else {
        newIdentity.english_name = prevData.identity.english_name;
      }

      if (data.logo !== prevData.identity.logo.value) {
        newIdentity.logo = { value: data.logo, error: '' };
        identityChanged = true;
      } else {
        newIdentity.logo = prevData.identity.logo;
      }

      if (data.primaryColor !== prevData.identity.primaryColor.value) {
        newIdentity.primaryColor = { value: data.primaryColor, error: '' };
        identityChanged = true;
      } else {
        newIdentity.primaryColor = prevData.identity.primaryColor;
      }

      if (data.secondaryColor !== prevData.identity.secondaryColor.value) {
        newIdentity.secondaryColor = { value: data.secondaryColor, error: '' };
        identityChanged = true;
      } else {
        newIdentity.secondaryColor = prevData.identity.secondaryColor;
      }

      if (data.fontFamily !== prevData.identity.fontFamily.value) {
        newIdentity.fontFamily = { value: data.fontFamily, error: '' };
        identityChanged = true;
      } else {
        newIdentity.fontFamily = prevData.identity.fontFamily;
      }

      if (identityChanged) {
        return {
          ...prevData,
          identity: newIdentity,
        };
      } else {
        return prevData;
      }
    });
  };

  const handleStepValidationChange = useCallback((isValid) => {
    setCurrentStepValidity(isValid);
  }, []);

  const handleSetStep = useCallback((newStep) => {
    // if (newStep > step && !currentStepValidity) {
    //   // Prevent moving to the next step if the current one is invalid
    //   return;
    // }
    setStep(newStep);
  }, [step, currentStepValidity]);

  const goToPreviousStep = useCallback(() => {
    console.log('goToPreviousStep triggered. Current step:', step);
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
      console.log('Navigating to previous step:', step - 1);
    }
  }, [step]);

  return (
    <div className={styles.container}>
      {/* <div className={styles.form_header}>
        <FormHeader />
      </div> */}
      {isLg && (
        <div className={styles.stepper_container}>
          <Stepper 
            step={step} 
            setStep={handleSetStep} 
            steps={steps} 
            isCurrentStepValid={currentStepValidity}
          />
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
        {!isLg && <Stepper step={step} setStep={handleSetStep} steps={steps} isCurrentStepValid={currentStepValidity} />}
        <div className={styles.page_container}>
          <div className={styles.form_container}>
            <div className={styles.form_content}>
              <div className={styles.step_container}>
                {step === 1 ? (
                  <StepOne
                    initialData={initialStepOneData}
                    onStepComplete={handleStepOneComplete}
                    onStepValidationChange={handleStepValidationChange}
                  />
                ) : step === 2 ? (
                  <StepTwo
                    whiteLabelData={whiteLabelData}
                    setWhiteLabelData={setWhiteLabelData}
                    onStepValidationChange={handleStepValidationChange}
                    goToPreviousStep={goToPreviousStep}
                  />
                ) : step === 3 ? (
                  <StepThree
                    whiteLabelData={whiteLabelData}
                    setWhiteLabelData={setWhiteLabelData}
                    onStepValidationChange={handleStepValidationChange}
                    goToPreviousStep={goToPreviousStep}
                  />
                ) : step === 4 ? (
                  <StepFour
                    whiteLabelData={whiteLabelData}
                    setWhiteLabelData={setWhiteLabelData}
                    onStepValidationChange={handleStepValidationChange}
                  />
                ) : step === 5 ? (
                  <StepFive
                    whiteLabelData={whiteLabelData}
                    setWhiteLabelData={setWhiteLabelData}
                    onStepValidationChange={handleStepValidationChange}
                  />
                ) : step === 6 ? (
                  <StepSix
                    whiteLabelData={whiteLabelData}
                    setWhiteLabelData={setWhiteLabelData}
                    onStepValidationChange={handleStepValidationChange}
                  />
                ) : null}
              </div>
              <div className={styles.buttons}>
                <button
                  className={`${styles.confirm_button} ${currentStepValidity && step !== steps.length ? styles.active : ''}`}
                  onClick={() => handleSetStep(step + 1)}
                  disabled={!currentStepValidity || step === steps.length}
                >
                  {' '}{t('signupForm.initialForm.buttons.continueButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelForm;
