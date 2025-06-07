import React, { useState } from "react";
import styles from "./stepOne.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputGroup/InputGroup";
const StepFour = () => {
  const [whiteLabelData, setWhiteLabelData] = useState({
    additionalServices: [],
  });
  return (
    <div className={styles.container}>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h3 className={styles.section_title}>
            {" "}
            <Image
              src="/svg/auth/personal-info.svg"
              alt="personal info"
              width={24}
              height={24}
            />{" "}
            نوع الفاعليات{" "}
          </h3>
          <div className={styles.options}>
            {[
              " تفعيل صفحة تهنئة/تعليقات بعد الفعالية",
              "تمكين التحميل التلقائي لصور الضيوف",
              " دعم النشرات البريدية أو الحملات الترويجية",
              " دعم النشرات البريدية أو الحملات الترويجية",
            ].map((item, index) => (
              <div className={styles.option} key={index}>
                <input
                  type="radio"
                  name="event_type"
                  id={`event_type_${index}`}
                />
                <label htmlFor={`event_type_${index}`}>{item}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
