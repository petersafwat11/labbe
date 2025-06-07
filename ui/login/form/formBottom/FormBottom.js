"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./formBottom.module.css";
import Image from "next/image";
const FormBottom = ({ text, clickHandler }) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <p className={styles.or}>أو تابع باستخدام</p>
      <button onClick={clickHandler} className={styles.toggle_button}>
        {text}
        <Image src="/svg/auth/mobile.svg" alt="arrow" width={16} height={20} />
      </button>
      <button className={styles.sign_up_button}>
        ليس لديك حساب؟{" "}
        <span
          onClick={() => router.push("/signup")}
          className={styles.make_acc}
        >
          إنشاء حساب
        </span>
      </button>
    </div>
  );
};

export default FormBottom;
