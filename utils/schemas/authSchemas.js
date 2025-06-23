'use client';
import { z } from 'zod';

export const emailLoginSchema = (t) => {
  return z.object({
    email: z
      .string()
      .min(1, t('loginForm.errors.emailRequired'))
      .email(t('loginForm.errors.invalidEmail')),
    password: z.string().min(8, t('loginForm.errors.invalidPassword')),
  });
};

export const otpLoginSchema = (t) => {
  return z.object({
    number: z
      .string()
      .min(10, t('loginForm.errors.phoneNumberInvalid'))
      .max(15, t('loginForm.errors.phoneNumberInvalid'))
      .regex(/^[0-9]+$/, t('loginForm.errors.phoneNumberInvalid')),
  });
};

export const otpSignupSchema = (t) => {
  return z.object({
    number: z
      .string()
      .min(10, t('signupForm.hostSignup.errors.phoneNumberInvalid'))
      .max(15, t('signupForm.hostSignup.errors.phoneNumberInvalid'))
      .regex(/^[0-9]+$/, t('signupForm.hostSignup.errors.phoneNumberInvalid')),
  });
};
