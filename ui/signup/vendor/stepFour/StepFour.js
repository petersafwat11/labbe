import React from "react";
import styles from "./stepFour.module.css";
import { StepTitle } from "../../whiteLabel/title/SectionTitle";

const StepFour = ({ vendorData, setVendorData }) => {
  return (
    <div className={styles.container}>
      <StepTitle
        title="التحقق التجاري"
        description="أرفق المستندات المطلوبة للتحقق من هويتك التجارية."
      />
      <div className={styles.sections}>
        <p>StepFour - Coming Soon</p>
      </div>
    </div>
  );
};

export default StepFour;
