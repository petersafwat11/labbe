import React from "react";
import styles from "./stepper.module.css";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Stepper = ({ step, setStep, steps }) => {
  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {steps.map((item, index) => (
          <div style={{ width: "100%" }} key={index}>
            <div className={styles.step}>
              <p className={styles.step_number}>{index + 1}</p>

              <div className={styles.step_text}>
                <p className={styles.step_title}> خطوة{index + 1}</p>
                <p className={styles.step_description}>{item}</p>
              </div>
            </div>
            {index !== 4 && <div className={styles.step_line}></div>}
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.prev_button}
          onClick={() => setStep(step - 1)}
        >
          رجوع
          <FaArrowRightLong className={styles.arrow_icon} />
        </button>
        <button
          className={styles.next_button}
          onClick={() => setStep(step + 1)}
        >
          {" "}
          <FaArrowLeftLong className={styles.arrow_icon} /> التالي{" "}
        </button>
      </div>
    </div>
  );
};

export default Stepper;
