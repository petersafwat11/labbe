import { z } from 'zod';

export const hostSchema = (t) => {
  return z
    .object({
      fullName: z
        .string()
        .min(1, t('signupForm.continueSignup.errors.fullNameRequired'))
        .min(2, t('signupForm.continueSignup.errors.fullNameMinLength')),
      email: z
        .string()
        .min(1, t('signupForm.continueSignup.errors.emailRequired'))
        .email(t('signupForm.continueSignup.errors.invalidEmail')),
      newPassword: z
        .string()
        .min(1, t('signupForm.continueSignup.errors.passwordMinLength')),
      confirmPassword: z
        .string()
        .min(1, t('signupForm.continueSignup.errors.confirmPasswordRequired')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('signupForm.continueSignup.errors.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });
};
