"use client";
import React, { useState } from "react";
import styles from "./forgetPassword.module.css";
import Image from "next/image";
import FormHeader from "../commen/formHeader/FormHeader";
import InputGroup from "../commen/inputs/inputGroup/InputGroup";
import ConfirmBtn from "../commen/confirmButton/ConfirmBtn";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showEmailSentMessage, setShowEmailSentMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(90);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Debug state changes
  React.useEffect(() => {
    console.log("State changed:", {
      email,
      emailError,
      showEmailSentMessage,
      isLoading,
    });
  }, [email, emailError, showEmailSentMessage, isLoading]);

  // Countdown timer for resend button
  React.useEffect(() => {
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    console.log("handleSubmit called", {
      email,
      emailError,
      showEmailSentMessage,
    });

    // Reset error
    setEmailError("");

    // Validate email
    if (!email.trim()) {
      console.log("Email is empty");
      setEmailError("البريد الإلكتروني مطلوب");
      return;
    }

    if (!validateEmail(email)) {
      console.log("Email format invalid");
      setEmailError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    console.log("Email validation passed, starting loading");
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      console.log("Setting email sent message to true");
      setIsLoading(false);
      setShowEmailSentMessage(true);
      // Reset countdown when email is sent
      setResendCountdown(90);
      setIsResendDisabled(true);
    }, 1500);
  };

  const handleResendLink = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Restart countdown after resending
      setResendCountdown(90);
      setIsResendDisabled(true);
      console.log("Link resent, countdown restarted");
    }, 1000);
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
        <div className={styles.form}>
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
            <h2 className={styles.title}>إعادة تعيين كلمة المرور الخاصة بك</h2>
            <p className={styles.description}>
              يرجى إدخال البريد الإلكتروني المرتبط بحسابك. لإعادة تعيين كلمة
              المرور فوراً.
            </p>
          </div>
          <InputGroup
            label="البريد اللإلكترونى"
            type="email"
            placeholder="ادخل البريد اللإلكترونى"
            required
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Clear error when user starts typing
              if (emailError) {
                setEmailError("");
              }
            }}
            error={emailError}
            iconPath="auth/email.svg"
          />
          <ConfirmBtn
            text={isLoading ? "جاري الإرسال..." : "تأكيد"}
            active={email.trim() && !isLoading}
            clickHandler={handleSubmit}
          />
        </div>
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
            <h2 className={styles.title}>تم إرسال رابط إعادة التعيين</h2>
            <p className={styles.description}>
              لقد أرسلنا رابطًا إلى بريدك الإلكتروني <strong>{email}</strong>{" "}
              لإعادة تعيين كلمة المرور، يرجى التحقق من بريدك.
            </p>
          </div>
          <ConfirmBtn
            text="الذهاب إلى البريد الالكتروني"
            active={true}
            clickHandler={handleGoToEmail}
          />
          <button
            className={styles.resend_link}
            onClick={handleResendLink}
            disabled={isLoading || isResendDisabled}
          >
            {isLoading
              ? "جاري الإرسال..."
              : isResendDisabled
              ? `(${resendCountdown} ثانية) إعادة إرسال الرابط`
              : "إعادة إرسال الرابط"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
