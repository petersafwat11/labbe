import React from "react";
import styles from "./forgetPassword.module.css";
import Image from "next/image";
const ForgetPassword = () => {
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default ForgetPassword;
