'use client';
import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { useTranslation } from 'react-i18next';
import FormHeader from '../../commen/formHeader/FormHeader';
import FormBottom from './formBottom/FormBottom';
import Greating from './Greating/Greating';
import ConfirmBtn from '@/ui/commen/confirmButton/ConfirmBtn';
import OtpInput from './otpInput/OtpInput';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailLoginSchema, otpLoginSchema } from '@/utils/schemas/authSchemas'; //
import EmailSection from './EmailForm';
import PhoneSection from './PhoneForm';
const Form = () => {
  const { t } = useTranslation('login');
  const [loginType, setLoginType] = useState('otp');
  const [data, setData] = useState({
    email: '',
    password: '',
    number: '',
  });

  const [verificationCode, setVerificationCode] = useState({
    value: ['', '', '', '', '', ''],
    error: '',
    show: false,
  });

  const schema = loginType === 'otp' ? otpLoginSchema(t) : emailLoginSchema(t);
  // Initialize React Hook Form
  // console.log('schema...', schema);
  const methods = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    mode: 'onTouched',
    defaultValues: {
      email: data.email,
      password: data.password,
      number: data.number,
    },
  });

  const { handleSubmit, watch, reset } = methods;

  const formValues = watch();

  useEffect(() => {
    // Reset form values when loginType or data changes to ensure correct schema is applied
    reset({
      email: data.email,
      password: data.password,
      number: data.number,
    });
  }, [loginType, data.email, data.password, data.number, reset]);

  const toggleLoginMethod = () => {
    setLoginType(loginType === 'otp' ? 'email' : 'otp');
    reset();
  };

  const handleLogin = (formData) => {
    if (loginType === 'otp') {
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
    } else if (loginType === 'email') {
      handleLogin(formData);
    } else if (loginType === 'otp' && verificationCode.show === false) {
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

  console.log(
    'create-update Values errors',
    methods.watch(),
    // methods.formState.
    methods.formState.errors
  );
  return (
    <div className={styles.container}>
      <div className={styles.form_header}>
        <FormHeader />
      </div>
      <FormProvider {...methods}>
        <div className={`${styles.form} `}>
          {!verificationCode.show && <Greating />}
          {verificationCode.show ? (
            <OtpInput
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              onGoBack={goBackToMobileInput}
            />
          ) : loginType === 'otp' ? (
            <PhoneSection />
          ) : (
            <EmailSection />
          )}
          <ConfirmBtn
            text={
              verificationCode.show
                ? t('loginForm.buttons.verify')
                : t('loginForm.buttons.login')
            }
            active={
              verificationCode.show
                ? verificationCode.value.every((digit) => digit !== '')
                : (formValues.email && formValues.password) ||
                  (loginType === 'otp' && formValues.number)
            }
            clickHandler={confirmBtnHandler}
          />
          {verificationCode.show ? (
            <button className={styles.edit_phone} onClick={goBackToMobileInput}>
              {t('loginForm.otpLogin.editPhone')}
            </button>
          ) : (
            <FormBottom
              text={
                loginType === 'otp'
                  ? t('loginForm.otpLogin.loginWithEmail')
                  : t('loginForm.emailLogin.loginWithOTP')
              }
              clickHandler={toggleLoginMethod}
            />
          )}
        </div>
      </FormProvider>
    </div>
  );
};

export default Form;
