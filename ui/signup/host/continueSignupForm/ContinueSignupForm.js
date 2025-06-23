'use client';
import React, { useState } from 'react';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import ConfirmBtn from '@/ui/commen/confirmButton/ConfirmBtn';
import WhiteLabelForm from '@/ui/signup/whiteLabel/WhiteLabelForm';
import ServiceSelectionCard from '@/ui/commen/serviceSelectionCard/ServiceSelectionCard';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './continueSignupForm.module.css';
import { hostSchema } from '@/utils/schemas/host.schema';

const ContinueSignupForm = () => {
  const { t } = useTranslation('signup');

  // Debug logging
  React.useEffect(() => {
    console.log(
      't result for passwordsDoNotMatch:',
      t('signupForm.continueSignup.errors.passwordsDoNotMatch')
    );
    console.log(
      't result for fullNameMinLength:',
      t('signupForm.continueSignup.errors.fullNameMinLength')
    );
  }, [t]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showWhiteLabelForm, setShowWhiteLabelForm] = useState(false);

  const [passwordValidations, setPasswordValidations] = useState([]);

  // Define validation schema
  const continueSignupSchema = hostSchema(t);

  // Initialize React Hook Form
  const methods = useForm({
    resolver: zodResolver(continueSignupSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors: formErrors, isValid },
  } = methods;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  const handleContinueSignup = (formData) => {
    console.log('Continue Signup data:', { ...formData, selectedService });
    if (selectedService === 'organizer') {
      setShowWhiteLabelForm(true);
    }
    // Add your continue signup logic here
  };

  const confirmBtnHandler = handleSubmit(handleContinueSignup);

  return (
    <div className={styles.container}>
      {showWhiteLabelForm ? (
        <WhiteLabelForm />
      ) : (
        <>
          <h1 className={styles.mainTitle}>
            {t('signupForm.continueSignup.title')}
          </h1>
          <p className={styles.mainDescription}>
            {t('signupForm.continueSignup.description')}
          </p>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleContinueSignup)}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {t('signupForm.continueSignup.personalInfo.title')}
                </h2>
                <div className={styles.inputsGroup}>
                  <InputGroup
                    label={t(
                      'signupForm.continueSignup.personalInfo.fullName.label'
                    )}
                    type="text"
                    placeholder={t(
                      'signupForm.continueSignup.personalInfo.fullName.placeholder'
                    )}
                    name="fullName"
                    iconPath="auth/profile.svg"
                  />
                  <InputGroup
                    label={t(
                      'signupForm.continueSignup.personalInfo.email.label'
                    )}
                    type="email"
                    placeholder={t(
                      'signupForm.continueSignup.personalInfo.email.placeholder'
                    )}
                    name="email"
                    iconPath="auth/email.svg"
                  />
                  <InputGroup
                    label={t(
                      'signupForm.continueSignup.personalInfo.newPassword.label'
                    )}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t(
                      'signupForm.continueSignup.personalInfo.newPassword.placeholder'
                    )}
                    name="newPassword"
                    iconPath="auth/password.svg"
                    iconPath2="auth/eye.svg"
                    onIconClick={togglePasswordVisibility}
                  />
                  <InputGroup
                    label={t(
                      'signupForm.continueSignup.personalInfo.confirmPassword.label'
                    )}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t(
                      'signupForm.continueSignup.personalInfo.confirmPassword.placeholder'
                    )}
                    name="confirmPassword"
                    iconPath="auth/password.svg"
                    iconPath2="auth/eye.svg"
                    onIconClick={toggleConfirmPasswordVisibility}
                  />
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <ConfirmBtn
                  text={t('signupForm.continueSignup.nextButton')}
                  active={isValid}
                  clickHandler={confirmBtnHandler}
                />
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default ContinueSignupForm;
