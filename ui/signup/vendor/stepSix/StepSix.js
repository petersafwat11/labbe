import React, { useState } from "react";
import styles from "./stepSix.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";
const StepSix = () => {
  return (
    <div className={styles.container}>
      <StepTitle
        title="روابط إضافية (اختياري )"
        description="أضف روابط يمكن للعملاء الرجوع إليها للتعرف على نشاطك."
      />
    </div>
  );
};

export default StepSix;
