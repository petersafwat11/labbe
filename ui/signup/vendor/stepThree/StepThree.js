import React from "react";
import styles from "./stepThree.module.css";
import { StepTitle } from "../../whiteLabel/title/SectionTitle";

const StepThree = ({ vendorData, setVendorData }) => {
  return (
    <div className={styles.container}>
      <StepTitle
        title="الصور والعروض والأسعار"
        description="أضف صور أعمالك وحدد باقات الأسعار الخاصة بك."
      />
      <div className={styles.sections}>
        <p>StepThree - Coming Soon</p>
      </div>
    </div>
  );
};

export default StepThree;
