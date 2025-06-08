import React, { useState } from "react";
import styles from "./stepThree.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";
import CheckBoxItems from "@/ui/commen/checkboxItems/CheckBoxItems";
const StepThree = () => {
  const [whiteLabelData, setWhiteLabelData] = useState({
    systemRequirements: {
      numberOfEvents: { value: "", error: "" },
      numberOfGuestsPerEvent: { value: "", error: "" },
      eventsTypes: { value: [], error: "" },
      services: { value: [], error: "" },
    },
  });
  return (
    <div className={styles.container}>
      <StepTitle
        title="الصور والعروض والأسعار"
        description="شارك أعمالك وأسعارك لتسهيل قرار العملاء."
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title="رفع 3 صور من اعمالك السابقة"
            icon="/svg/auth/gallery.svg"
            height={24}
            width={24}
          />
        </div>
        <div className={styles.section}>
          <SectionTitle
            title="شعار النشاط التجاري (إن وجد)"
            icon="/svg/auth/document.svg"
            height={24}
            width={24}
          />
        </div>
        <div className={styles.section}>
          <SectionTitle
            title="قوائم الأسعار أو الباقات"
            icon="/svg/auth/document.svg"
            height={24}
            width={24}
          />
        </div>
      </div>
    </div>
  );
};

export default StepThree;
