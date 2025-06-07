import React from "react";
import styles from "./otpInput.module.css";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const OtpInput = () => {
  const [otp, setOtp] = useState("");

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
        <p className={styles.resend_code}>إعادة إرسال الرمز؟ (90 ثانية)</p>
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
          <button className={styles.verify}>التحقق</button>
          <button className={styles.edit_phone}>تعديل رقم الهاتف</button>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
