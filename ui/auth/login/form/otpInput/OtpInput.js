"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./otpInput.module.css";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const OtpInput = ({ verificationCode, setVerificationCode, onGoBack }) => {
  const [resendTime, setResendTime] = useState(90);
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const otpInputHandler = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    // Limit to 1 character
    const singleDigit = value.slice(0, 1);

    const newVerificationCode = [...verificationCode.value];
    newVerificationCode[index] = singleDigit;
    setVerificationCode({
      ...verificationCode,
      value: newVerificationCode,
    });

    // Auto-tab to next input if digit is entered
    if (singleDigit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace - go to previous input if current is empty
    if (e.key === "Backspace" && !verificationCode.value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    // Only process if pasted data contains only numbers
    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const digits = pastedData.slice(0, 6).split("");
    const newVerificationCode = [...verificationCode.value];

    digits.forEach((digit, index) => {
      if (index < 6) {
        newVerificationCode[index] = digit;
      }
    });

    setVerificationCode({
      ...verificationCode,
      value: newVerificationCode,
    });

    // Focus the next empty input or the last filled input
    const nextEmptyIndex = newVerificationCode.findIndex((val) => val === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrow_container}
        onClick={onGoBack}
        style={{ cursor: "pointer" }}
      >
        <FaArrowRightLong className={styles.arrow} />
      </div>
      <Image src="/svg/auth/otp.svg" alt="otp" width={120} height={120} />
      <div className={styles.text_and_input}>
        <div className={styles.text_container}>
          <p className={styles.title}>التحقق من رقم الهاتف</p>
          <p className={styles.description}>
            لقد أرسلنا رمز مكون من 6 أرقام إلى رقم هاتفك المحمول +966021545 يرجى
            إدخاله أدناه
          </p>
          <p className={styles.resend_code}>
            إعادة إرسال الرمز؟ ({resendTime} ثانية)
          </p>
        </div>
        <div style={{ direction: "ltr" }} className={styles.input_container}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              value={verificationCode.value[index]}
              onChange={(e) => otpInputHandler(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              type="text"
              placeholder="_"
              className={styles.input}
              key={index}
              maxLength={1}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
