import React from "react";
import styles from "./stepsTracker.module.css";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const StepsTracker = () => {
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
          <div className={styles.step_1} key={index}>
            <p className={styles.step_number}>{index + 1}</p>
            <div className={styles.step_text}>
              <p className={styles.step_title}>{item}</p>
              <p className={styles.step_description}>{item}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles.prev_button}>
          <FaArrowLeftLong className={styles.arrow_icon} /> رجوع
        </button>
        <button className={styles.next_button}>
          {" "}
          التالي <FaArrowRightLong className={styles.arrow_icon} />{" "}
        </button>
      </div>
    </div>
  );
};

export default StepsTracker;
