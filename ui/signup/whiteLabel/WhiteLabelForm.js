'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Stepper from '../../commen/stepper/Stepper';
import styles from './whiteLabelform.module.css';
import StepOne from './stepOne/StepOne';
import StepTwo from './stepTwo/StepTwo';
import StepFour from './stepFour/StepFour';
import StepFive from './stepFive/StepFive';
import StepThree from './stepThreee/StepThree';
import StepSix from './stepSix/StepSix';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { whiteLabelSchema } from '@/utils/schemas/whiteLabelSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStepHandler, validateStep } from '@/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const WhiteLabelForm = () => {
  const { t } = useTranslation('signup');
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = parseInt(searchParams.get('step'), 10) || 1;
  const [step, setStep] = useState(initialStep);
  const [currentStepValidity, setCurrentStepValidity] = useState(false);
  const steps = [
    { id: 1, desc: t('signupForm.whiteLabel.steps.identity') },
    { id: 2, desc: t('signupForm.whiteLabel.steps.login') },
    { id: 3, desc: t('signupForm.whiteLabel.steps.requirements') },
    { id: 4, desc: t('signupForm.whiteLabel.steps.services') },
    { id: 5, desc: t('signupForm.whiteLabel.steps.payment') },
    { id: 6, desc: t('signupForm.whiteLabel.steps.summary') },
  ];

  const methods = useForm({
    resolver: zodResolver(whiteLabelSchema(t)),
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    mode: 'onTouched',
    // defaultValues: {
    //   // email: data.email,
    //   // password: data.password,
    //   // number: data.number,
    // },
  });
  console.log(
    'create-update Values errors',
    methods.watch(),
    // methods.formState.
    methods.formState.errors
  );

  const isLg = useMediaQuery('(min-width: 1024px)');

  // Map step to fields for validation
  const stepFieldsMap = {
    1: ['identity'],
    2: ['loginData'],
    3: ['systemRequirements'],
    4: ['additionalServices'],
    5: ['paymentData'],
    // 6: [] // summary, no validation
  };
  const handleSetStep = useCallback(
    (newStep) => {
      if (newStep > step && !currentStepValidity) {
        // Prevent moving to the next step if the current one is invalid
        return;
      }
      setStep(newStep);
      console.log('currentStepValidity,,,', currentStepValidity);
      const params = new URLSearchParams(window.location.search);
      params.set('step', newStep);
      router.replace(`?${params.toString()}`);
    },
    [step, currentStepValidity, router]
  );
  const handleNext = (e) => {
    e.preventDefault();
    const isValid = validateStep({
      schema: whiteLabelSchema(t),
      fields: stepFieldsMap[step],
      watch: methods.watch,
      setError: methods.setError,
    });
    if (isValid) {
      // Do your next step logic here
      setCurrentStepValidity(isValid);
      handleSetStep(step + 1);
    }
  };

  const goToPreviousStep = useCallback(() => {
    console.log('goToPreviousStep triggered. Current step:', step);
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
      console.log('Navigating to previous step:', step - 1);
    }
  }, [step]);

  useEffect(() => {
    setCurrentStepValidity(false);
  }, [step]);
  return (
    <div className={styles.container}>
      {/* <div className={styles.form_header}>
        <FormHeader />
      </div> */}
      <FormProvider {...methods}>
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
          {!isLg && (
            <Stepper
              step={step}
              setStep={handleSetStep}
              steps={steps}
              isCurrentStepValid={currentStepValidity}
            />
          )}
          <div className={styles.page_container}>
            <div className={styles.form_container}>
              <div className={styles.form_content}>
                <div className={styles.step_container}>
                  {step === 1 ? (
                    <StepOne handleNext={handleNext} />
                  ) : step === 2 ? (
                    <StepTwo goToPreviousStep={goToPreviousStep} />
                  ) : //
                  //
                  step === 3 ? (
                    <StepThree goToPreviousStep={goToPreviousStep} />
                  ) : step === 4 ? (
                    <StepFour goToPreviousStep={goToPreviousStep} />
                  ) : //
                  step === 5 ? (
                    <StepFive goToPreviousStep={goToPreviousStep} />
                  ) : //

                  step === 6 ? (
                    <StepSix goToPreviousStep={goToPreviousStep} />
                  ) : null}
                </div>
                <div className={styles.buttons}>
                  <button
                    className={`${styles.confirm_button} ${
                      step !== steps.length ? styles.active : ''
                    }`}
                    type="button"
                    onClick={handleNext}
                    // disabled={!currentStepValidity || step === steps.length}
                  >
                    {' '}
                    {t('signupForm.initialForm.buttons.continueButton')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default WhiteLabelForm;
