'use client';
import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { useTranslation } from 'react-i18next';
import FormHeader from '../../commen/formHeader/FormHeader';
import FormBottom from './formBottom/FormBottom';
import Greating from './Greating/Greating';
import InputGroup from '@/ui/commen/inputs/inputGroup/InputGroup';
import ConfirmBtn from '@/ui/commen/confirmButton/ConfirmBtn';
import MobileInputGroup from '@/ui/commen/inputs/mobileInputGroup/MobileInputGroup';
import OtpInput from './otpInput/OtpInput';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Form = () => {
  const router = useRouter();
  const { t } = useTranslation('login');

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    number: '',
    type: 'otp',
  });

  const [verificationCode, setVerificationCode] = useState({
    value: ['', '', '', '', '', ''],
    error: '',
    show: false,
  });

  // Define validation schemas
  const emailLoginSchema = z.object({
    email: z.string()
      .min(1, t('loginForm.errors.emailRequired'))
      .email(t('loginForm.errors.invalidEmail')),
    password: z.string()
      .min(8, t('loginForm.errors.invalidPassword'))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        t('loginForm.errors.invalidPassword')
      ),
  });

  const otpLoginSchema = z.object({
    number: z.string()
      .min(10, t('loginForm.errors.phoneNumberInvalid'))
      .max(15, t('loginForm.errors.phoneNumberInvalid'))
      .regex(/^[0-9]+$/, t('loginForm.errors.phoneNumberInvalid')),
  });

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    watch,
    reset
  } = useForm({
    resolver: zodResolver(data.type === 'otp' ? otpLoginSchema : emailLoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: data.email,
      password: data.password,
      number: data.number,
    },
  });

  useEffect(() => {
    // Reset form values when data.type changes to ensure correct schema is applied
    reset({
      email: data.email,
      password: data.password,
      number: data.number,
    });
  }, [data.type, data.email, data.password, data.number, reset]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginMethod = () => {
    setData({ ...data, type: data.type === 'otp' ? 'email' : 'otp' });
    reset();
  };

  const handleLogin = (formData) => {
    if (data.type === 'otp') {
      console.log('OTP Login data:', formData.number);
      // Add your OTP login logic here
    } else {
      console.log('Email Login data:', formData.email, formData.password);
      // Add your email/password login logic here
    }
  };

  const confirmBtnHandler = handleSubmit(async (formData) => {
    if (verificationCode.show === true) {
      // Handle OTP verification
      if (verificationCode.value.every((digit) => digit !== '')) {
        console.log('OTP verification:', verificationCode.value.join(''));
        handleLogin(formData);
      }
    } else if (data.type === 'email') {
      handleLogin(formData);
    } else if (
      data.type === 'otp' &&
      verificationCode.show === false
    ) {
      setVerificationCode({ ...verificationCode, show: true });
    }
  });

  const goBackToMobileInput = () => {
    setVerificationCode({
      ...verificationCode,
      show: false,
      value: ['', '', '', '', '', ''],
    });
    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_header}>
        <FormHeader />
      </div>

      <div className={`${styles.form} `}>
        {verificationCode.show === false && <Greating />}
        {verificationCode.show === true ? (
          <OtpInput
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            onGoBack={goBackToMobileInput}
          />
        ) : data.type === 'otp' ? (
          <div className={styles.otp}>
            <MobileInputGroup
              label={t('loginForm.otpLogin.phoneNumber')}
              type="text"
              name="number"
              value={data.number}
              onChange={(e) => {
                setData({ ...data, number: e.target.value });
                setValue('number', e.target.value, { shouldValidate: true });
              }}
              error={formErrors.number?.message}
            />
          </div>
        ) : (
          <div className={styles.email_login}>
            <div className={styles.inputs}>
              <InputGroup
                label={t('loginForm.emailLogin.email.label')}
                type="email"
                placeholder={t('loginForm.emailLogin.email.placeholder')}
                required
                name="email"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                  setValue('email', e.target.value, { shouldValidate: true });
                }}
                error={formErrors.email?.message}
                iconPath="auth/email.svg"
              />
              <InputGroup
                label={t('loginForm.emailLogin.password.label')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('loginForm.emailLogin.password.placeholder')}
                required
                name="password"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                  setValue('password', e.target.value, { shouldValidate: true });
                }}
                error={formErrors.password?.message}
                iconPath="auth/password.svg"
                iconPath2="auth/eye.svg"
                onIconClick={togglePasswordVisibility}
              />
            </div>
            <div className={styles.buttons}>
              <button
                onClick={() => router.push('/change-password')}
                className={styles.forgot_password}
              >
                {t('loginForm.emailLogin.forgotPassword')}
              </button>

              <div className={styles.remember_me}>
                <p>{t('loginForm.emailLogin.rememberMe')}</p>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        )}
        <ConfirmBtn
          text={
            verificationCode.show === true
              ? t('loginForm.buttons.verify')
              : t('loginForm.buttons.login')
          }
          active={
            verificationCode.show === true
              ? verificationCode.value.every((digit) => digit !== '')
              : (data.email && data.password) ||
                (data.type === 'otp' && data.number)
          }
          clickHandler={confirmBtnHandler}
        />
        {verificationCode.show === true ? (
          <button className={styles.edit_phone} onClick={goBackToMobileInput}>
            {t('loginForm.otpLogin.editPhone')}
          </button>
        ) : (
          <FormBottom
            text={
              data.type === 'otp'
                ? t('loginForm.otpLogin.loginWithEmail')
                : t('loginForm.emailLogin.loginWithOTP')
            }
            clickHandler={toggleLoginMethod}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
