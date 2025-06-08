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

const Form = () => {
  const router = useRouter();
  const { t } = useTranslation('login');
  console.log("t('loginForm.greeting')..", t('loginForm.greeting'));

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    number: '',
    type: 'email',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    number: '',
    otp: '',
  });
  const [verificationCode, setVerificationCode] = useState({
    value: ['', '', '', '', '', ''],
    error: '',
    show: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginMethod = () => {
    setData({ ...data, type: data.type === 'otp' ? 'email' : 'otp' });
  };

  const handleLogin = () => {
    if (data.type === 'otp') {
      console.log('otp');
    } else {
      console.log('login');
    }
  };

  const confirmBtnHandler = () => {
    console.log('clicked');
    if (verificationCode.show === true) {
      // Handle OTP verification
      if (verificationCode.value.every((digit) => digit !== '')) {
        console.log('OTP verification:', verificationCode.value.join(''));
        handleLogin();
      }
    } else if (data.type === 'email' && data.email && data.password) {
      handleLogin();
    } else if (
      data.type === 'otp' &&
      data.number &&
      verificationCode.show === false
    ) {
      setVerificationCode({ ...verificationCode, show: true });
    }
  };

  const goBackToMobileInput = () => {
    setVerificationCode({
      ...verificationCode,
      show: false,
      value: ['', '', '', '', '', ''],
    });
  };

  useEffect(() => {
    console.log(verificationCode);
  }, [verificationCode]);

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
              onChange={(e) => setData({ ...data, number: e.target.value })}
              error={errors.number}
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
                onChange={(e) => setData({ ...data, email: e.target.value })}
                error={errors.email}
                iconPath="auth/email.svg"
              />
              <InputGroup
                label={t('loginForm.emailLogin.password.label')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('loginForm.emailLogin.password.placeholder')}
                required
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                error={errors.password}
                iconPath="auth/password.svg"
                iconPath2={showPassword ? 'auth/eye-off.svg' : 'auth/eye.svg'}
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
      {/* <OtpInput /> */}
    </div>
  );
};

export default Form;
