"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./formBottom.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";
const FormBottom = ({ text, clickHandler }) => {
  const router = useRouter();
  const { t } = useTranslation("signup");

  return (
    <div className={styles.container}>
      <p className={styles.or}>Or continue with</p>
      <button onClick={clickHandler} className={styles.toggle_button}>
        {text}
        <Image
          src={`/svg/auth/mobile.svg`}
          alt="arrow"
          width={16}
          height={20}
        />
      </button>
      <button className={styles.sign_up_button}>
        Already have an account?{" "}
        <span
          onClick={() => router.push("/login")}
          className={styles.make_acc}
        >
          Sign In
        </span>
      </button>
    </div>
  );
};

export default FormBottom; 