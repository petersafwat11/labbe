"use client";
import React, { useState, useEffect } from "react";
import styles from "./otpInput.module.css";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import ConfirmBtn from "@/ui/commen/confirmButton/ConfirmBtn";

const OtpInput = () => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({
    otp: "",
  });
  const [resendTime, setResendTime] = useState(90);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ otp: "الرمز المرسل مطلوب" });
  };
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

  return (
    <div className={styles.container}>
      <div className={styles.arrow_container}>
        <FaArrowRightLong className={styles.arrow} />
      </div>
      <Image src="/svg/otp.svg" alt="otp" width={149} height={149} />
      <div className={styles.text_and_input}>
        <p className={styles.title}>التحقق من رقم الهاتف</p>
        <p className={styles.description}>
          لقد أرسلنا رمز مكون من 6 أرقام إلى رقم هاتفك المحمول +966021545 يرجى
          إدخاله أدناه
        </p>
        <p className={styles.resend_code}>
          إعادة إرسال الرمز؟ ({resendTime} ثانية)
        </p>
        <div className={styles.input_container}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <input
              value={otp[index]}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className={styles.input}
              key={index}
            />
          ))}
        </div>
        <div className={styles.verify_container}>
          <ConfirmBtn text="التحقق" active={otp} onClick={handleSubmit} />
          <button className={styles.edit_phone}>تعديل رقم الهاتف</button>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
