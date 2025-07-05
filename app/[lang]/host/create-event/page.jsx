'use client';
import React, { useEffect, useCallback } from 'react';
import Button from '@/ui/commen/button/Button';
import Stepper from '@/ui/commen/stepper-2/Stepper';
import styles from './page.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createEventSchema,
  hasRequiredStepData,
  validateStep,
} from '@/utils/schemas/createEventSchema';
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@/hooks/use-media-query';
import hostAPI from '@/lib/host';

const Step1 = dynamic(() => import('./_components/eventSteps/Step1'), {
  ssr: false,
});

const Step2 = dynamic(() => import('./_components/eventSteps/Step2'), {
  ssr: false,
});

const Step3 = dynamic(() => import('./_components/eventSteps/Step3'), {
  ssr: false,
});

const Step4 = dynamic(() => import('./_components/eventSteps/Step4'), {
  ssr: false,
});

const Step5 = dynamic(() => import('./_components/eventSteps/Step5'), {
  ssr: false,
});

export default function CreateEventPage() {
  const { t } = useTranslation('createEvent');
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = parseInt(searchParams.get('step'), 10) || 1;

  const isLg = useMediaQuery('(min-width: 1024px)');
  const steps = [
    { id: 1, label: t('step1_label') },
    { id: 2, label: t('step2_label') },
    { id: 3, label: t('step3_label') },
    { id: 4, label: t('step4_label') },
    { id: 5, label: t('step5_label') },
  ];

  const methods = useForm({
    resolver: zodResolver(createEventSchema(t)),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      eventDetails: {
        title: '',
        type: '',
        date: null,
        time: '',
        location: {
          address: '',
          latitude: null,
          longitude: null,
          city: '',
          country: '',
        },
        description: '',
      },
      guestList: [],
      supervisorsList: [],
      invitationSettings: {
        selectedTemplate: null,
        invitationMessage: '',
        attendanceAutoReply: '',
        absenceAutoReply: '',
        expectedAttendanceAutoReply: '',
        note: '',
      },
      launchSettings: {
        sendSchedule: 'now',
        scheduledDate: null,
        scheduledTime: '',
      },
    },
  });

  const { watch } = methods;
  const formData = watch();

  // console.log('formData, ', formData, 'formErorors', methods.formState.errors);

  // Step validation and redirection effect
  useEffect(() => {
    // Check if previous steps have required data
    for (let step = 1; step < currentStep; step++) {
      if (!hasRequiredStepData(step, formData)) {
        // Redirect to the first incomplete step
        // updateStep(step);
        return;
      }
    }
  }, [currentStep, formData]);

  const updateStep = useCallback(
    (newStep) => {
      const params = new URLSearchParams(window.location.search);
      params.set('step', newStep.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const handleNext = useCallback(
    async (e) => {
      console.log('handleNext start');
      e.preventDefault();

      // Validate current step
      const validation = validateStep(currentStep, formData, t);

      if (validation.success) {
        if (currentStep < 5) {
          updateStep(currentStep + 1);
        } else {
          // Final submission
          try {
            console.log('Submitting event:', formData);
            // Here you would typically submit to your API
            // await submitEvent(formData);
          } catch (error) {
            console.error('Error submitting event:', error);
          }
        }
      } else {
        // Set form errors
        // console.error('Validation errors:', validation.error);

        validation.error.forEach((err) => {
          methods.setError(
            err.path.join('.'),
            { type: 'manual', message: err.message, ref: err.name },
            { shouldFocus: true }
          );
        });
      }
    },

    [currentStep, formData, t, updateStep]
  );

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      updateStep(currentStep - 1);
    }
  }, [currentStep, updateStep]);

  const handleStepClick = useCallback(
    (stepNumber) => {
      // Allow going to previous steps or current step
      if (stepNumber <= currentStep) {
        updateStep(stepNumber);
      } else {
        // Check if all previous steps are valid before allowing forward navigation
        let canProceed = true;
        for (let step = 1; step < stepNumber; step++) {
          if (!hasRequiredStepData(step, formData)) {
            canProceed = false;
            break;
          }
        }
        if (canProceed) {
          updateStep(stepNumber);
        }
      }
    },
    [currentStep, formData, updateStep]
  );

  const getCurrentStepValidity = useCallback(() => {
    return hasRequiredStepData(currentStep, formData);
  }, [currentStep, formData]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      default:
        return <Step1 />;
    }
  };
  async function submitEvent() {
    if (currentStep === steps.length) {
      //  submit event
      try {
        const response = await hostAPI.createEvent(formData);
        console.log('response..', response);
      } catch (error) {
        console.error('Error submitting event:', error);
      }

      return;
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div>
          <h1 className={styles.headerTitle}>
            <img
              src={`/svg/events/${
                isLg ? 'back-arrow' : 'back-arrow-small'
              }.svg`}
              alt=""
            />
            <span>{t('page_title')}</span>
          </h1>
          {isLg && <p className={styles.headerDesc}>{t('page_description')}</p>}
        </div>
        <div>
          <Button variant="primary" title={t('invite_button')} />
        </div>
      </div>

      <div className={styles.left}>
        {' '}
        {/* Stepper */}
        <Stepper
          currentStep={currentStep}
          steps={steps}
          setStep={handleStepClick}
          isCurrentStepValid={getCurrentStepValidity()}
        />
        <FormProvider {...methods}>
          <form
            className={styles.stepsWrapper}
            onSubmit={methods.handleSubmit(submitEvent)}
          >
            {/* <CardLayout className={styles.formCard}> */}
            {renderCurrentStep()}

            <div className={styles.actionBtns}>
              <div className={styles.Button}>
                <Button
                  variant="secondary"
                  title={t('previous_button')}
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                />
              </div>
              <div className={styles.Button}>
                {currentStep == 5 ? (
                  <Button
                    variant="primary"
                    title={t('confirm_and_launch')}
                    type="submit"
                  />
                ) : (
                  <Button
                    variant="primary"
                    title={
                      currentStep === 5
                        ? t('confirm_and_launch')
                        : t('next_button')
                    }
                    onClick={handleNext}
                    type="button"
                  />
                )}
              </div>
            </div>
            {/* </CardLayout> */}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
