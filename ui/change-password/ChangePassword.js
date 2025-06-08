'use client';
import React, { useState } from 'react';
import styles from './changePassword.module.css';
import FormHeader from '../commen/formHeader/FormHeader';
import InputGroup from '../commen/inputs/inputGroup/InputGroup';
import ConfirmBtn from '../commen/confirmButton/ConfirmBtn';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
  const router = useRouter();
  const { t } = useTranslation('changePassword');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return t('changePasswordForm.errors.passwordMinLength');
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return t('changePasswordForm.errors.passwordComplexity');
    }
    return '';
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = () => {
    const newErrors = {};

    // Validate new password
    const passwordError = validatePassword(formData.newPassword);
    if (!formData.newPassword) {
      newErrors.newPassword = t(
        'changePasswordForm.errors.newPasswordRequired'
      );
    } else if (passwordError) {
      newErrors.newPassword = passwordError;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t(
        'changePasswordForm.errors.confirmPasswordRequired'
      );
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t(
        'changePasswordForm.errors.passwordsNotMatch'
      );
    }

    setErrors(newErrors);

    // If no errors, proceed
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setPasswordChanged(true);
      }, 2000);
    }
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  const passwordChangedMessage = () => {
    return (
      <div className={styles.email_sent_message}>
        <div className={styles.image_container}>
          <Image
            className={styles.icon}
            src={'/svg/auth/forget-password.svg'}
            alt="password-changed"
            width={115}
            height={116}
          />
        </div>
        <div className={styles.text_container}>
          <h2 className={styles.title}>
            {t('changePasswordForm.success.title')}
          </h2>
          <p className={styles.description}>
            {t('changePasswordForm.success.description')}
          </p>
        </div>
        <ConfirmBtn
          text={t('changePasswordForm.buttons.login')}
          active={true}
          clickHandler={handleGoToLogin}
        />
      </div>
    );
  };

  if (passwordChanged) {
    return (
      <div className={styles.container}>
        <div className={styles.form_header}>
          <FormHeader />
        </div>
        {passwordChangedMessage()}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.form_header}>
        <FormHeader />
      </div>
      <div className={styles.form}>
        <div className={styles.image_container}>
          <Image
            className={styles.icon}
            src={'/svg/auth/forget-password.svg'}
            alt="change-password"
            width={80}
            height={105}
          />
        </div>
        <div className={styles.text_container}>
          <h2 className={styles.title}>{t('changePasswordForm.title')}</h2>
          <p className={styles.description}>
            {t('changePasswordForm.subtitle')}
          </p>
        </div>
        <div className={styles.inputs_container}>
          <InputGroup
            label={t('changePasswordForm.newPassword.label')}
            type={showPassword.newPassword ? 'text' : 'password'}
            placeholder={t('changePasswordForm.newPassword.placeholder')}
            required
            name="newPassword"
            value={formData.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            error={errors.newPassword}
            iconPath="auth/password.svg"
            iconPath2={
              showPassword.newPassword ? 'auth/eye-off.svg' : 'auth/eye.svg'
            }
            onIconClick={() => togglePasswordVisibility('newPassword')}
          />
          <InputGroup
            label={t('changePasswordForm.confirmPassword.label')}
            type={showPassword.confirmPassword ? 'text' : 'password'}
            placeholder={t('changePasswordForm.confirmPassword.placeholder')}
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange('confirmPassword', e.target.value)
            }
            error={errors.confirmPassword}
            iconPath="auth/password.svg"
            iconPath2={
              showPassword.confirmPassword ? 'auth/eye-off.svg' : 'auth/eye.svg'
            }
            onIconClick={() => togglePasswordVisibility('confirmPassword')}
          />
        </div>
        <ConfirmBtn
          text={
            isLoading
              ? t('changePasswordForm.buttons.updating')
              : t('changePasswordForm.buttons.confirm')
          }
          active={
            formData.newPassword && formData.confirmPassword && !isLoading
          }
          clickHandler={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
