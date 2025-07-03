'use client';
import React, { useState, useCallback, useEffect } from 'react';
import CardLayout from '@/ui/commen/card/CardLayout';
import Button from '@/ui/commen/button/Button';
import Stepper from '@/ui/commen/stepper-2/Stepper';
import styles from './page.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEventSchema } from '@/utils/schemas/createEventSchema';
import { useTranslation } from 'react-i18next';
import { validateStep } from '@/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const Step1 = dynamic(() => import('@/ui/host/create-event/eventSteps/Step1'), {
  ssr: false,
});

const Step2 = dynamic(() => import('@/ui/host/create-event/eventSteps/Step2'), {
  ssr: false,
});

const Step3 = dynamic(() => import('@/ui/host/create-event/eventSteps/Step3'), {
  ssr: false,
});


const Step4 = dynamic(() => import('@/ui/host/create-event/eventSteps/Step4'), {
  ssr: false,
});

const Step5 = dynamic(() => import('@/ui/host/create-event/eventSteps/Step5'), {
  ssr: false,
});


export default function CreateEventPage() {
  const { t } = useTranslation('createEvent');
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = parseInt(searchParams.get('step'), 10) || 1;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [currentStepValidity, setCurrentStepValidity] = useState(false);

  const steps = [
    { id: 1, label: t('step1_label') },
    { id: 2, label: t('step2_label') },
    { id: 3, label: t('step3_label') },
    { id: 4, label: t('step4_label') },
    { id: 5, label: t('step5_label') },
  ];

  const stepFieldsMap = {
    1: ['eventDetails'],
    2: ['guestList'],
    3: ['supervisorsList'],
    4: ['invitaionTemple'],
    5: ['summary'],
  };

  const methods = useForm({
    resolver: zodResolver(createEventSchema(t)),
    reValidateMode: 'onChange',
    mode: 'onTouched',
    shouldFocusError: false,
    defaultValues: {
      guestList: [],
      // TODO: update default values for create event
    },
  });

  const handleSetStepCallback = useCallback(
    (newStep) => {
      if (newStep > currentStep && !currentStepValidity) {
        // Prevent moving to the next step if the current one is invalid
        return;
      }
      setCurrentStep(newStep);
      const params = new URLSearchParams(window.location.search);
      params.set('step', newStep);
      router.push(`?${params.toString()}`);
    },
    [currentStep, currentStepValidity, router]
  );

  const handleNext = (e) => {
    e.preventDefault();
    const isValid = validateStep({
      schema: createEventSchema(t),
      fields: stepFieldsMap[currentStep],
      watch: methods.watch,
      setError: methods.setError,
    });
    console.log('isValid', isValid);
    if (isValid) {
      setCurrentStepValidity(isValid);
      handleSetStepCallback(currentStep + 1);
    }
  };

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  }, [currentStep]);

  useEffect(() => {
    // Step 4 is always valid (summary step)
    if (currentStep === 4) {
      setCurrentStepValidity(true);
    } else {
      setCurrentStepValidity(false);
    }
  }, [currentStep]);

  // Example: current step is the first one (id: 1)
  // const currentStep = steps[2].id; // Removed duplicate declaration

  return (
    <div className={styles.wrapper}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div>
          <h1 className={styles.headerTitle}>
            <img src="/svg/events/back-arrow.svg" alt="" />
            <span>{t('page_title')}</span>
          </h1>
          <p className={styles.headerDesc}>{t('page_description')}</p>
        </div>
        <div>
          <Button variant="primary" title={t('invite_button')} />
        </div>
      </div>
      {/* Stepper */}
      <Stepper
        currentStep={currentStep}
        steps={steps}
        setStep={handleSetStepCallback}
        isCurrentStepValid={currentStepValidity}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleNext}>
          <CardLayout className={styles.formCard}>
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
            {currentStep === 4 && <Step4 />}
            {currentStep === 5 && <Step5 />}
            <div className={styles.buttonRow}>
              <Button
                variant="secondary"
                title={t('previous_button')}
                type="button"
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
              />
              <Button
                variant="primary"
                title={
                  currentStep === 4
                    ? t('submit_button') || 'Submit'
                    : t('next_button')
                }
                type="submit"
              />
            </div>
          </CardLayout>
        </form>
      </FormProvider>
    </div>
  );
}
