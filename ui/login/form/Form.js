"use client";
import React, { useEffect, useState } from "react";
import styles from "./form.module.css";
import FormHeader from "../../commen/formHeader/FormHeader";
import FormBottom from "./formBottom/FormBottom";
import Greating from "./Greating/Greating";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import ConfirmBtn from "@/ui/commen/confirmButton/ConfirmBtn";
import MobileInputGroup from "@/ui/commen/inputs/mobileInputGroup/MobileInputGroup";
import OtpInput from "./otpInput/OtpInput";
const Form = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    number: "",
    type: "email",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    number: "",
    otp: "",
  });
  const [verificationCode, setVerificationCode] = useState({
    value: ["", "", "", "", "", ""],
    error: "",
    show: false,
  });
  const toggleLoginMethod = () => {
    setData({ ...data, type: data.type === "otp" ? "email" : "otp" });
  };
  const handleLogin = () => {
    if (data.type === "otp") {
      console.log("otp");
    } else {
      console.log("login");
    }
  };
  const confirmBtnHandler = () => {
    console.log("clicked");
    if (verificationCode.show === true) {
      // Handle OTP verification
      if (verificationCode.value.every((digit) => digit !== "")) {
        console.log("OTP verification:", verificationCode.value.join(""));
        handleLogin();
      }
    } else if (data.type === "email" && data.email && data.password) {
      handleLogin();
    } else if (
      data.type === "otp" &&
      data.number &&
      verificationCode.show === false
    ) {
      setVerificationCode({ ...verificationCode, show: true });
    }
  };

  const goBackToMobileInput = () => {
    setVerificationCode({
      ...verificationCode,
      show: false,
      value: ["", "", "", "", "", ""],
    });
  };

  useEffect(() => {
    console.log(verificationCode);
  }, [verificationCode]);
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
        ) : data.type === "otp" ? (
          <div className={styles.otp}>
            <MobileInputGroup
              label="رقم الهاتف"
              type="text"
              name="number"
              value={data.number}
              onChange={(e) => setData({ ...data, number: e.target.value })}
              error={errors.number}
            />
          </div>
        ) : (
          <div className={styles.email_login}>
            <div className={styles.inputs}>
              <InputGroup
                label="البريد اللإلكترونى"
                type="email"
                placeholder="ادخل البريد اللإلكترونى"
                required
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                error={errors.email}
                iconPath="auth/email.svg"
              />
              <InputGroup
                label="كلمة المرور"
                type="password"
                placeholder="ادخل كلمة المرور"
                required
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                error={errors.password}
                iconPath="auth/password.svg"
                iconPath2="auth/eye.svg"
              />
            </div>
            <div className={styles.buttons}>
              <button className={styles.forgot_password}>
                نسيت كلمة المرور
              </button>

              <div className={styles.remember_me}>
                <p>تذكرنى</p>

                <input type="checkbox" />
              </div>
            </div>
          </div>
        )}
        <ConfirmBtn
          text={verificationCode.show === true ? "التحقق" : "تسجيل الدخول"}
          active={
            verificationCode.show === true
              ? verificationCode.value.every((digit) => digit !== "")
              : (data.email && data.password) ||
                (data.type === "otp" && data.number)
          }
          clickHandler={confirmBtnHandler}
        />
        {verificationCode.show === true ? (
          <button className={styles.edit_phone} onClick={goBackToMobileInput}>
            تعديل رقم الهاتف
          </button>
        ) : (
          <FormBottom
            text={
              data.type === "otp"
                ? "تسجيل الدخول بالبريد اللإلكترونى"
                : "تسجيل الدخول بكلمة مرور مؤقتة"
            }
            clickHandler={toggleLoginMethod}
          />
        )}
      </div>
      {/* <OtpInput /> */}
    </div>
  );
};

export default Form;
