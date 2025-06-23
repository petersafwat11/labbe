'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/ui/login/form/form.module.css';
import { getI18n, useTranslation } from 'react-i18next';
import FormHeader from '../../commen/formHeader/FormHeader';
import FormBottom from '@/ui/login/form/formBottom/FormBottom';
// import Greating from './Greating/Greating';
import ConfirmBtn from '@/ui/commen/confirmButton/ConfirmBtn';
// import OtpInput from './otpInput/OtpInput';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  emailLoginSchema,
  otpLoginSchema,
  otpSignupSchema,
} from '@/utils/schemas/authSchemas'; //
// import EmailSection from './EmailForm';
import PhoneSection from '@/ui/commen/inputs/PhoneForm';
import Link from 'next/link';
import useLanguageChange from '@/hooks/UseLanguageChange';
import { useRouter } from 'next/navigation';
const Form = () => {
  const { t } = useTranslation('signup');
  const { currentLocale } = useLanguageChange();
  const [loginType, setLoginType] = useState('otp');
  const router = useRouter();
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

  const schema = loginType === 'otp' ? otpSignupSchema(t) : emailLoginSchema(t);
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
    reset({
      email: data.email,
      password: data.password,
      number: data.number,
    });
  }, [loginType, data.email, data.password, data.number, reset]);

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
    // if (verificationCode.show === true) {
    //   // Handle OTP verification
    //   if (verificationCode.value.every((digit) => digit !== '')) {
    //     console.log('OTP verification:', verificationCode.value.join(''));
    //     handleLogin(formData);
    //   }
    // } else if (loginType === 'email') {
    //   handleLogin(formData);
    // } else if (loginType === 'otp' && verificationCode.show === false) {
    //   setVerificationCode({ ...verificationCode, show: true });
    // }
    router.push(`/${currentLocale}/signup/continue-signup`);
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
        <form onSubmit={handleSubmit(confirmBtnHandler)}>
          <div className={`${styles.form} `}>
            <PhoneSection />

            <ConfirmBtn
              text={t('signupForm.hostSignup.buttons.login')}
              active={
                verificationCode.show
                  ? verificationCode.value.every((digit) => digit !== '')
                  : (formValues.email && formValues.password) ||
                    (loginType === 'otp' && formValues.number)
              }
              clickHandler={confirmBtnHandler}
            />

            <button className={styles.sign_up_button}>
              {t('signupForm.hostSignup.formBottom.noAccount')}{' '}
              <Link
                href={`/${currentLocale}/login`}
                className={styles.make_acc}
              >
                {t('signupForm.hostSignup.formBottom.createAccount')}
              </Link>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
