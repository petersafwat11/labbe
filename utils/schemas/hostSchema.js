import { z } from "zod";

// Host initial signup schema (just phone number)
export const hostSignupSchema = (t) => {
  return z.object({
    phoneNumber: z
      .string()
      .min(7, t("signupForm.hostSignup.errors.phoneNumberInvalid"))
      .max(15, t("signupForm.hostSignup.errors.phoneNumberInvalid"))
      .regex(/^[0-9]+$/, t("signupForm.hostSignup.errors.phoneNumberInvalid")),
  });
};

// Host profile completion schema
export const hostProfileSchema = (t) => {
  return z
    .object({
      username: z
        .string()
        .min(1, t("signupForm.hostSignup.errors.usernameRequired"))
        .min(3, t("signupForm.hostSignup.errors.usernameMinLength")),
      email: z
        .string()
        .min(1, t("signupForm.hostSignup.errors.emailRequired"))
        .email(t("signupForm.hostSignup.errors.invalidEmail")),
      password: z
        .string()
        .min(8, t("signupForm.hostSignup.errors.passwordMinLength")),
      passwordConfirm: z
        .string()
        .min(1, t("signupForm.hostSignup.errors.passwordConfirmRequired")),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t("signupForm.hostSignup.errors.passwordsDoNotMatch"),
      path: ["passwordConfirm"],
    });
};
