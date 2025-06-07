"use client";
import React, { useState } from "react";
import styles from "./forgetPassword.module.css";
import Image from "next/image";
import FormHeader from "../commen/formHeader/FormHeader";
import InputGroup from "../commen/inputGroup/InputGroup";
import ConfirmBtn from "../commen/confirmButton/ConfirmBtn";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.form_header}>
        <FormHeader />
      </div>

      <div className={styles.image_container}>
        <Image
          src={"/svg/logs/lock.svg"}
          alt="forget-password"
          width={100}
          height={100}
        />
        <Image
          src={"/svg/logs/dots.svg"}
          alt="forget-password"
          width={100}
          height={100}
        />
      </div>
      <h2 className={styles.title}>إعادة تعيين كلمة المرور الخاصة بك</h2>
      <p className={styles.description}>
        يرجى إدخال البريد الإلكتروني المرتبط بحسابك. لإعادة تعيين كلمة المرور
        فوراً.
      </p>
      <InputGroup
        label="البريد اللإلكترونى"
        type="email"
        placeholder="ادخل البريد اللإلكترونى"
        required
        placement="left"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        iconPath="auth/email.svg"
      />
      <ConfirmBtn
        text="تسجيل الدخول"
        active={email}
        // onClick={() => setData({ ...data, type: "otp" })}
      />
    </div>
  );
};

export default ForgetPassword;
