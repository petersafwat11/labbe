'use client';
import React, { useEffect, useState } from 'react';
import styles from './signupForm.module.css';
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

const SignupForm = () => {
  const router = useRouter();
  const { t } = useTranslation('signup');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
    type: 'otp',
  });

  const [verificationCode, setVerificationCode] = useState({
    value: ['', '', '', '', '', ''],
    error: '',
    show: false,
  });

  // Define validation schemas for signup
  const emailSignupSchema = z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: z.string()
      .min(1, 'Email is required')
      .email('Invalid email format'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string()
      .min(1, 'Please confirm your password'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const otpSignupSchema = z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    number: z.string()
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must be less than 15 digits')
      .regex(/^[0-9]+$/, 'Phone number must contain only digits'),
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
    resolver: zodResolver(data.type === 'otp' ? otpSignupSchema : emailSignupSchema),
    mode: 'onChange',
    defaultValues: {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      number: data.number,
    },
  });

  useEffect(() => {
    // Reset form values when data.type changes to ensure correct schema is applied
    reset({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      number: data.number,
    });
  }, [data.type, data.name, data.email, data.password, data.confirmPassword, data.number, reset]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleSignupMethod = () => {
    setData({ ...data, type: data.type === 'otp' ? 'email' : 'otp' });
    reset();
  };

  const handleSignup = (formData) => {
    if (data.type === 'otp') {
      console.log('OTP Signup data:', { name: formData.name, number: formData.number });
      // Add your OTP signup logic here
    } else {
      console.log('Email Signup data:', { 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
      // Add your email/password signup logic here
    }
  };

  const confirmBtnHandler = handleSubmit(async (formData) => {
    if (verificationCode.show === true) {
      // Handle OTP verification
      if (verificationCode.value.every((digit) => digit !== '')) {
        console.log('OTP verification:', verificationCode.value.join(''));
        handleSignup(formData);
      }
    } else if (data.type === 'email') {
      handleSignup(formData);
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
            <InputGroup
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              required
              name="name"
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
                setValue('name', e.target.value, { shouldValidate: true });
              }}
              error={formErrors.name?.message}
              iconPath="auth/user.svg"
            />
            <MobileInputGroup
              label="Phone Number"
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
          <div className={styles.email_signup}>
            <div className={styles.inputs}>
              <InputGroup
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                required
                name="name"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                  setValue('name', e.target.value, { shouldValidate: true });
                }}
                error={formErrors.name?.message}
                iconPath="auth/user.svg"
              />
              <InputGroup
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
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
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
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
              <InputGroup
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                required
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={(e) => {
                  setData({ ...data, confirmPassword: e.target.value });
                  setValue('confirmPassword', e.target.value, { shouldValidate: true });
                }}
                error={formErrors.confirmPassword?.message}
                iconPath="auth/password.svg"
                iconPath2="auth/eye.svg"
                onIconClick={toggleConfirmPasswordVisibility}
              />
            </div>
            <div className={styles.terms}>
              <div className={styles.remember_me}>
                <p>I agree to the Terms and Conditions</p>
                <input type="checkbox" required />
              </div>
            </div>
          </div>
        )}
        <ConfirmBtn
          text={
            verificationCode.show === true
              ? 'Verify'
              : 'Sign Up'
          }
          active={
            verificationCode.show === true
              ? verificationCode.value.every((digit) => digit !== '')
              : data.type === 'email' 
                ? (data.name && data.email && data.password && data.confirmPassword && data.password === data.confirmPassword)
                : (data.name && data.number)
          }
          clickHandler={confirmBtnHandler}
        />
        {verificationCode.show === true ? (
          <button className={styles.edit_phone} onClick={goBackToMobileInput}>
            Edit Phone Number
          </button>
        ) : (
          <FormBottom
            text={
              data.type === 'otp'
                ? 'Sign up with Email'
                : 'Sign up with Phone'
            }
            clickHandler={toggleSignupMethod}
          />
        )}
      </div>
    </div>
  );
};

export default SignupForm;
