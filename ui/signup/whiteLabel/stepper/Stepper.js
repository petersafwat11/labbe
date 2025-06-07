import React from "react";
import styles from "./stepper.module.css";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Stepper = () => {
  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {[
          "الهوية البصرية",
          "بيانات الدخول والتخصص",
          "متطلبات النظام",
          "خدمات اضافية",
          "معلومات الفواتير والدفع",
        ].map((item, index) => (
          <>
            <div className={styles.step} key={index}>
              <div className={styles.step_text}>
                <p className={styles.step_title}> خطوة{index + 1}</p>
                <p className={styles.step_description}>{item}</p>
              </div>
              <p className={styles.step_number}>{index + 1}</p>
            </div>
            {index !== 4 && <div className={styles.step_line}></div>}
          </>
        ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles.next_button}>
          {" "}
          <FaArrowLeftLong className={styles.arrow_icon} /> التالي{" "}
        </button>
        <button className={styles.prev_button}>
          رجوع
          <FaArrowRightLong className={styles.arrow_icon} />
        </button>
      </div>
    </div>
  );
};

export default Stepper;
