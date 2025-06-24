"use client";
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./forgetPassword.module.css";
import Image from "next/image";
import FormHeader from "../commen/formHeader/FormHeader";
import InputGroup from "../commen/inputs/inputGroup/InputGroup";
import ConfirmBtn from "../commen/confirmButton/ConfirmBtn";
import { useTranslation } from "react-i18next";
import { authAPI, handleAPIError } from "@/lib/auth";

const ForgetPassword = () => {
  const { t } = useTranslation("forgetPassword");
  const {
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useFormContext();

  const [showEmailSentMessage, setShowEmailSentMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(90);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [sentEmail, setSentEmail] = useState("");

  const email = watch("email");

  // Countdown timer for resend button
  useEffect(() => {
    let timer;
    if (showEmailSentMessage && isResendDisabled && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showEmailSentMessage, isResendDisabled, resendCountdown]);

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    setIsLoading(true);
    setSentEmail(data.email);

    try {
      await authAPI.forgotPassword(data.email);

      setShowEmailSentMessage(true);
      setResendCountdown(90);
      setIsResendDisabled(true);
    } catch (error) {
      console.error("Forget password error:", error);
      const errorMessage = handleAPIError(error);
      // You could set form errors here if needed
      // setError('email', { message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendLink = async () => {
    setIsLoading(true);

    try {
      await authAPI.forgotPassword(sentEmail);

      setResendCountdown(90);
      setIsResendDisabled(true);
      console.log("Link resent, countdown restarted");
    } catch (error) {
      console.error("Resend link error:", error);
      const errorMessage = handleAPIError(error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToEmail = () => {
    // This could open the email app or redirect
    window.open("mailto:", "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_header}>
        <FormHeader />
      </div>
      {!showEmailSentMessage ? (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.image_container}>
            <Image
              className={styles.icon}
              src={"/svg/auth/forget-password.svg"}
              alt="forget-password"
              width={80}
              height={105}
            />
          </div>
          <div className={styles.text_container}>
            <h2 className={styles.title}>{t("forgetPasswordForm.title")}</h2>
            <p className={styles.description}>
              {t("forgetPasswordForm.description")}
            </p>
          </div>
          <InputGroup
            label={t("forgetPasswordForm.email.label")}
            type="email"
            placeholder={t("forgetPasswordForm.email.placeholder")}
            required
            name="email"
            iconPath="auth/email.svg"
          />
          <ConfirmBtn
            text={
              isLoading
                ? t("forgetPasswordForm.buttons.sending")
                : t("forgetPasswordForm.buttons.confirm")
            }
            active={isValid && email?.trim() && !isLoading}
            clickHandler={handleSubmit(onSubmit)}
          />
        </form>
      ) : (
        <div className={styles.email_sent_message}>
          <div className={styles.image_container}>
            <Image
              className={styles.icon}
              src={"/svg/auth/send-email.svg"}
              alt="email-sent"
              width={120}
              height={120}
            />
          </div>
          <div className={styles.text_container}>
            <h2 className={styles.title}>
              {t("forgetPasswordForm.emailSent.title")}
            </h2>
            <p className={styles.description}>
              {t("forgetPasswordForm.emailSent.description", {
                email: sentEmail,
              })}
            </p>
          </div>
          <ConfirmBtn
            text={t("forgetPasswordForm.buttons.goToEmail")}
            active={true}
            clickHandler={handleGoToEmail}
          />
          <button
            className={styles.resend_link}
            onClick={handleResendLink}
            disabled={isLoading || isResendDisabled}
            type="button"
          >
            {isLoading
              ? t("forgetPasswordForm.buttons.sending")
              : isResendDisabled
              ? t("forgetPasswordForm.buttons.resendCountdown", {
                  count: resendCountdown,
                })
              : t("forgetPasswordForm.buttons.resendLink")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
