'use client';
import React, { useState } from 'react';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import ConfirmBtn from '@/ui/commen/confirmButton/ConfirmBtn';
import WhiteLabelForm from '@/ui/signup/whiteLabel/WhiteLabelForm';
import ServiceSelectionCard from '@/ui/commen/serviceSelectionCard/ServiceSelectionCard';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './continueSignupForm.module.css';

const ContinueSignupForm = () => {
  const { t } = useTranslation('continueSignup');
  
  // Debug logging
  React.useEffect(() => {
    console.log('t result for passwordsDoNotMatch:', t('continueSignup.errors.passwordsDoNotMatch'));
    console.log('t result for fullNameMinLength:', t('continueSignup.errors.fullNameMinLength'));
  }, [t]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showWhiteLabelForm, setShowWhiteLabelForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordValidations, setPasswordValidations] = useState([]);

  const validatePassword = (password) => {
    const validations = [
  {
    text: t('continueSignup.errors.passwordMinLength'),
    isValid: password.length >= 8,
  },
  {
    text: t('continueSignup.errors.passwordComplexity'),
    isValid: /(?=.*[a-z])(?=.*[A-Z])/.test(password), 
  },
  {
    text: t('continueSignup.errors.passwordSpecialChar'),
    isValid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  },
];

    setPasswordValidations(validations);

    // Return true if all validations pass, false otherwise
    return validations.every((v) => v.isValid);
  };

  // Define validation schema
  const continueSignupSchema = z.object({
    fullName: z.string()
      .min(1, t('continueSignup.errors.fullNameRequired'))
      .min(2, t('continueSignup.errors.fullNameMinLength')),
    email: z.string()
      .min(1, t('continueSignup.errors.emailRequired'))
      .email(t('continueSignup.errors.invalidEmail')),
    newPassword: z.string()
      .min(1, t('continueSignup.errors.passwordMinLength')),
    confirmPassword: z.string()
      .min(1, t('continueSignup.errors.confirmPasswordRequired')),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: t('continueSignup.errors.passwordsDoNotMatch'),
    path: ['confirmPassword'],
  });

  // Initialize React Hook Form
  const {
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(continueSignupSchema),
    mode: 'onChange',
    defaultValues: formData,
  });

  const handleInputChange = async (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setValue(fieldName, value, { shouldValidate: true });
    await trigger(fieldName);

    if (fieldName === 'newPassword') {
      validatePassword(value);
    }
  };

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

  const isFormValid = () => {
    const hasRequiredFields = formData.fullName && 
                             formData.email && 
                             formData.newPassword && 
                             formData.confirmPassword;
    const passwordsMatch = formData.newPassword === formData.confirmPassword;
    const hasSelectedService = selectedService !== '';
    
    return hasRequiredFields && passwordsMatch && hasSelectedService;
  };

  return (
    <div className={styles.container}>
      {showWhiteLabelForm ? (
        <WhiteLabelForm />
      ) : (
        <>
          <h1 className={styles.mainTitle}>{t('continueSignup.title')}</h1>
          <p className={styles.mainDescription}>{t('continueSignup.description')}</p>

          <div>
            <h2 className={styles.sectionTitle}>{t('continueSignup.personalInfo.title')}</h2>
            <div className={styles.inputsGroup}>
              <InputGroup
                label={t('continueSignup.personalInfo.fullName.label')}
                type="text"
                placeholder={t('continueSignup.personalInfo.fullName.placeholder')}
                name="fullName"
                iconPath="auth/profile.svg"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                error={formErrors.fullName?.message}
              />
              <InputGroup
                label={t('continueSignup.personalInfo.email.label')}
                type="email"
                placeholder={t('continueSignup.personalInfo.email.placeholder')}
                name="email"
                iconPath="auth/email.svg"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={formErrors.email?.message}
              />
              <InputGroup
                label={t('continueSignup.personalInfo.newPassword.label')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('continueSignup.personalInfo.newPassword.placeholder')}
                name="newPassword"
                iconPath="auth/password.svg"
                iconPath2="auth/eye.svg"
                onIconClick={togglePasswordVisibility}
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                error={formErrors.newPassword?.message === t('continueSignup.errors.passwordComplexity') ? null : formErrors.newPassword?.message}
                validations={passwordValidations}
              />
              <InputGroup
                label={t('continueSignup.personalInfo.confirmPassword.label')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('continueSignup.personalInfo.confirmPassword.placeholder')}
                name="confirmPassword"
                iconPath="auth/password.svg"
                iconPath2="auth/eye.svg"
                onIconClick={toggleConfirmPasswordVisibility}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                error={formErrors.confirmPassword?.message}
              />
            </div>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>{t('continueSignup.serviceSelection.title')}</h2>
            <p className={styles.serviceQuestion}>{t('continueSignup.serviceSelection.question')}</p>
            <div className={styles.serviceCards}>
              <ServiceSelectionCard
                title={t('continueSignup.serviceSelection.organizerInvitation.title')}
                mainPrice="2,299"
                subPrice="129"
                description={t('continueSignup.serviceSelection.organizerInvitation.description')}
                features={[
                  { text: t('continueSignup.serviceSelection.features.largeScaleCompetitivePricing'), included: true },
                  { text: t('continueSignup.serviceSelection.features.customReportsAnalytics'), included: true },
                  { text: t('continueSignup.serviceSelection.features.phoneSupportPriority'), included: true },
                  { text: t('continueSignup.serviceSelection.features.globalLocalSales'), included: true },
                ]}
                additionalFeaturesText={t('continueSignup.serviceSelection.features.additional')}
                buttonText={t('continueSignup.selectButton')}
                iconPath="/svg/auth/document.svg"
                iconAlt="Organizer Icon"
                onClick={() => handleServiceSelection('organizer')}
                isSelected={selectedService === 'organizer'}
              />
              <ServiceSelectionCard
                title={t('continueSignup.serviceSelection.onUsInvitation.title')}
                mainPrice="1,500"
                subPrice="99"
                description={t('continueSignup.serviceSelection.onUsInvitation.description')}
                features={[
                  { text: t('continueSignup.serviceSelection.features.designSendGuestTracking'), included: true },
                  { text: t('continueSignup.serviceSelection.features.customReportsAnalytics'), included: true },
                ]}
                additionalFeaturesText={t('continueSignup.serviceSelection.features.additional')}
                buttonText={t('continueSignup.selectButton')}
                iconPath="/svg/auth/document.svg"
                iconAlt="On Us Icon"
                onClick={() => handleServiceSelection('onUs')}
                isSelected={selectedService === 'onUs'}
              />
              <ServiceSelectionCard
                title={t('continueSignup.serviceSelection.inYourHandsInvitation.title')}
                mainPrice="800"
                subPrice="49"
                description={t('continueSignup.serviceSelection.inYourHandsInvitation.description')}
                features={[
                  { text: t('continueSignup.serviceSelection.features.designSendWhatsappQRCodes'), included: true },
                  { text: t('continueSignup.serviceSelection.features.largeScaleCompetitivePricing'), included: true },
                ]}
                additionalFeaturesText={t('continueSignup.serviceSelection.features.additional')}
                buttonText={t('continueSignup.selectButton')}
                iconPath="/svg/auth/document.svg"
                iconAlt="In Your Hands Icon"
                onClick={() => handleServiceSelection('inYourHands')}
                isSelected={selectedService === 'inYourHands'}
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <ConfirmBtn
              text={t('continueSignup.nextButton')}
              active={isFormValid()}
              clickHandler={confirmBtnHandler}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ContinueSignupForm; 