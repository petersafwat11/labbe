"use client";
import React, { useState, useEffect } from "react";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import ConfirmBtn from "@/ui/commen/confirmButton/ConfirmBtn";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hostProfileSchema } from "@/utils/schemas/hostSchema";
import { authAPI, cookieUtils } from "@/lib/auth";
import useLanguageChange from "@/hooks/UseLanguageChange";
import { useRouter } from "next/navigation";
import styles from "./continueSignupForm.module.css";
import { toastUtils } from "@/utils/toastUtils";

const ContinueSignupForm = () => {
  const { t } = useTranslation("signup");
  const { currentLocale } = useLanguageChange();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  // Initialize React Hook Form
  const methods = useForm({
    resolver: zodResolver(hostProfileSchema(t)),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = methods;

  const formValues = watch();

  // Check if user has access token
  useEffect(() => {
    const token = cookieUtils.getCookie("accessToken");
    setToken(token);
    if (!token) {
      // Redirect to signup page if no token
      router.push(`/${currentLocale}/signup`);
    }
  }, [currentLocale, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      console.log("Completing host profile:", formData);
      const response = await authAPI.completeHostProfile(formData, token);

      if (response.status === "success") {
        // Update token in cookie
        const { token, user } = response;
        if (token) {
          cookieUtils.setCookie("token", token, 7);
        }
        if (user) {
          cookieUtils.setCookie("user", JSON.stringify(user), 7);
        }
        console.log("Host profile completed successfully:", response);

        // Redirect to dashboard or home page
        toastUtils.success(
          "Host profile completed successfully! Welcome aboard!"
        );
        router.push(`/${currentLocale}`);
      }
    } catch (err) {
      console.error("Complete profile error:", err);
      const errorMessage =
        err.message || "Failed to complete profile. Please try again.";
      setError(errorMessage);
      toastUtils.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>
        {t("signupForm.continueSignup.title")}
      </h1>
      <p className={styles.mainDescription}>
        {t("signupForm.continueSignup.description")}
      </p>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {t("signupForm.continueSignup.personalInfo.title")}
            </h2>
            <div className={styles.inputsGroup}>
              <InputGroup
                label={t(
                  "signupForm.continueSignup.personalInfo.fullName.label"
                )}
                type="text"
                placeholder={t(
                  "signupForm.continueSignup.personalInfo.fullName.placeholder"
                )}
                name="username"
                iconPath="auth/profile.svg"
              />
              <InputGroup
                label={t("signupForm.continueSignup.personalInfo.email.label")}
                type="email"
                placeholder={t(
                  "signupForm.continueSignup.personalInfo.email.placeholder"
                )}
                name="email"
                iconPath="auth/email.svg"
              />
              <InputGroup
                label={t(
                  "signupForm.continueSignup.personalInfo.newPassword.label"
                )}
                type={showPassword ? "text" : "password"}
                placeholder={t(
                  "signupForm.continueSignup.personalInfo.newPassword.placeholder"
                )}
                name="password"
                iconPath="auth/password.svg"
                iconPath2="auth/eye.svg"
                onIconClick={togglePasswordVisibility}
              />
              <InputGroup
                label={t(
                  "signupForm.continueSignup.personalInfo.confirmPassword.label"
                )}
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t(
                  "signupForm.continueSignup.personalInfo.confirmPassword.placeholder"
                )}
                name="passwordConfirm"
                iconPath="auth/password.svg"
                iconPath2="auth/eye.svg"
                onIconClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.buttonContainer}>
            <ConfirmBtn
              text={t("signupForm.continueSignup.nextButton")}
              active={isValid && !isLoading}
              clickHandler={handleSubmit(onSubmit)}
              disabled={isLoading}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ContinueSignupForm;
