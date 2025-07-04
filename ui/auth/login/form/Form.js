"use client";
import React, { useEffect, useState } from "react";
import styles from "./form.module.css";
import { useTranslation } from "react-i18next";
import FormHeader from "../../../commen/formHeader/FormHeader";
import FormBottom from "./formBottom/FormBottom";
import Greating from "./Greating/Greating";
import ConfirmBtn from "@/ui/commen/confirmButton/ConfirmBtn";
import OtpInput from "./otpInput/OtpInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailLoginSchema, otpLoginSchema } from "@/utils/schemas/authSchemas";
import EmailSection from "./EmailForm";
import PhoneSection from "./PhoneForm";
import { authAPI, cookieUtils } from "@/lib/auth";
import useLanguageChange from "@/hooks/UseLanguageChange";
import { useRouter } from "next/navigation";
import { toastUtils } from "@/utils/toastUtils";

const Form = () => {
  const { t } = useTranslation("login");
  const { currentLocale } = useLanguageChange();
  const router = useRouter();
  const [loginType, setLoginType] = useState("otp");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const schema = loginType === "otp" ? otpLoginSchema(t) : emailLoginSchema(t);

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      number: "",
    },
  });

  const { handleSubmit, watch, reset } = methods;
  const formValues = watch();

  const toggleLoginMethod = () => {
    setLoginType(loginType === "otp" ? "email" : "otp");
    setShowOtpInput(false);
    setVerificationCode(["", "", "", "", "", ""]);
    setError("");
    reset();
  };

  const handleEmailLogin = async (formData) => {
    setIsLoading(true);
    setError("");
    try {
      console.log("Email Login:", formData);
      const response = await authAPI.login(formData.email, formData.password);
      const { user } = response.data;
      const { token } = response;
      // Save token to cookie
      token && cookieUtils.setCookie("token", token, 7);
      user && cookieUtils.setCookie("user", JSON.stringify(user), 7);
      toastUtils.success(`Welcome back! Login successful as ${user.username}.`);

      // Redirect based on user type or to dashboard
      if (response.userType === "host") {
        router.push(`/${currentLocale}/host`); // Redirect to dashboard/home
      } else if (response.userType === "vendor") {
        router.push(`/${currentLocale}/vendor`); // Redirect to vendor dashboard
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      toastUtils.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async (formData) => {
    setIsLoading(true);
    setError("");
    try {
      console.log("Sending OTP to:", formData.number);
      const response = await authAPI.sendOTP(formData.number, "login");

      if (response.status === "success") {
        console.log("OTP sent successfully:", response);
        setShowOtpInput(true);
        toastUtils.success("OTP sent successfully to your phone number!");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      const errorMessage =
        err.message || "Failed to send OTP. Please try again.";
      setError(errorMessage);
      toastUtils.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = verificationCode.join("");
    if (otpCode.length !== 6) return;

    setIsLoading(true);
    setError("");
    try {
      console.log("Verifying OTP:", otpCode);
      const response = await authAPI.verifyOTP(formValues.number, otpCode);

      if (response.status === "success") {
        // Save token to cookie
        const { token } = response;
        token && cookieUtils.setCookie("token", token, 7);
        const { user } = response;
        user && cookieUtils.setCookie("user", JSON.stringify(user), 7);

        console.log("OTP verification successful:", response);
        toastUtils.success(
          `Welcome back! OTP verification successful as ${user.username}.`
        );

        // Redirect based on user type or to dashboard
        if (response.userType === "host") {
          router.push(`/${currentLocale}/host`); // Redirect to dashboard/home
        } else if (response.userType === "vendor") {
          router.push(`/${currentLocale}/vendor`); // Redirect to vendor dashboard
        }
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      const errorMessage = err.message || "Invalid OTP. Please try again.";
      setError(errorMessage);
      toastUtils.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBackToPhone = () => {
    setShowOtpInput(false);
    setVerificationCode(["", "", "", "", "", ""]);
    setError("");
  };

  const onSubmit = async (formData) => {
    if (showOtpInput) {
      await handleVerifyOTP();
    } else if (loginType === "email") {
      await handleEmailLogin(formData);
    } else {
      await handleSendOTP(formData);
    }
  };

  const isFormValid = () => {
    if (showOtpInput) {
      return verificationCode.every((digit) => digit !== "") && !isLoading;
    }
    if (loginType === "email") {
      console.log("formValues", formValues);
      return formValues.email && formValues.password && !isLoading;
    }
    return formValues.number && !isLoading;
  };
  useEffect(() => {
    console.log("formValues", formValues);
  }, [formValues]);

  return (
    <div className={styles.container}>
      <div className={styles.form_header}>
        <FormHeader />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form}>
            {!showOtpInput && <Greating />}

            {showOtpInput ? (
              <OtpInput
                verificationCode={{
                  value: verificationCode,
                  error: "",
                  show: true,
                }}
                setVerificationCode={(data) => setVerificationCode(data.value)}
                onGoBack={handleGoBackToPhone}
              />
            ) : loginType === "otp" ? (
              <PhoneSection />
            ) : (
              <EmailSection />
            )}

            {error && <div className={styles.error_message}>{error}</div>}

            <ConfirmBtn
              text={
                showOtpInput
                  ? t("loginForm.buttons.verify")
                  : t("loginForm.buttons.login")
              }
              active={isFormValid()}
              clickHandler={handleSubmit(onSubmit)}
              disabled={isLoading}
            />

            {showOtpInput ? (
              <button
                type="button"
                className={styles.edit_phone}
                onClick={handleGoBackToPhone}
              >
                {t("loginForm.otpLogin.editPhone")}
              </button>
            ) : (
              <FormBottom
                text={
                  loginType === "otp"
                    ? t("loginForm.otpLogin.loginWithEmail")
                    : t("loginForm.emailLogin.loginWithOTP")
                }
                clickHandler={toggleLoginMethod}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
