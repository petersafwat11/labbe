import React, { useState } from "react";
import styles from "./stepFour.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";
import CheckBoxItems from "@/ui/commen/checkboxItems/CheckBoxItems";
const StepFour = () => {
  const [whiteLabelData, setWhiteLabelData] = useState({
    additionalServices: { value: [], error: "" },
  });
  return (
    <div className={styles.container}>
      <StepTitle
        title="التحقق التجاري"
        description="هذه المعلومات للوثائق الإدارية فقط ولن تظهر للزوار."
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title="نسخة من السجل التجارى إن وجد (اختيارى)"
            icon="/svg/auth/document.svg"
            height={24}
            width={24}
          />
        </div>
        <div className={styles.section}>
          <SectionTitle
            title="(طلب أي تراخيص أخرى (اختيارى"
            icon="/svg/auth/document.svg"
            height={24}
            width={24}
          />
        </div>
      </div>
    </div>
  );
};

export default StepFour;
