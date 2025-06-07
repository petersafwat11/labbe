"use client";
import React, { useState } from "react";
import styles from "./form.module.css";
import FormHeader from "../../commen/formHeader/FormHeader";
import FormBottom from "./formBottom/FormBottom";
import Greating from "./Greating/Greating";
import InputGroup from "@/ui/commen/inputGroup/InputGroup";
import ConfirmBtn from "@/ui/commen/confirmButton/ConfirmBtn";
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
  const toggleLoginMethod = () => {
    setData({ ...data, type: data.type === "otp" ? "email" : "otp" });
  };
  return (
    <div className={styles.container}>
      <div className={styles.form_header}>
        <FormHeader />
      </div>

      {/* <div className={`${styles.form} `}>
        <Greating />
        {data.type === "otp" ? (
          <div className={styles.otp}>
          </div>
        ) : (
          <div className={styles.email_login}>
            <div className={styles.inputs}>
              <InputGroup
                label="البريد اللإلكترونى"
                type="email"
                placeholder="ادخل البريد اللإلكترونى"
                required
                placement="left"
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
                placement="left"
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
          text="تسجيل الدخول"
          active={data.email && data.password}
          // onClick={() => setData({ ...data, type: "otp" })}
        />
        <FormBottom
          text={
            data.type === "otp"
              ? "تسجيل الدخول بالبريد اللإلكترونى"
              : "تسجيل الدخول بكلمة مرور مؤقتة"
          }
          clickHandler={toggleLoginMethod}
        />
      </div> */}
      <OtpInput />
    </div>
  );
};

export default Form;
