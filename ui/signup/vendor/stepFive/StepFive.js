import React, { useState } from "react";
import styles from "./stepFive.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";
const StepFive = () => {
  return (
    <div className={styles.container}>
      <StepTitle
        title="سياسة التعامل والدفع"
        description="حدد آلية الدفع وسياسات التعامل مع العملاء."
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title="آلية الدفع"
            // icon="/svg/auth/building.svg"
            // height={24}
            // width={24}
          />

          <div className={styles.inputs}>
            <InputGroup
              label="اسم الجهة/المنشأة الرسمية"
              type="text"
              placeholder="الاسم الرسمي للشركة
"
              required
              name="companyName"
              value={whiteLabelData.paymentData.companyName.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  paymentData: {
                    ...whiteLabelData.paymentData,
                    companyName: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.paymentData.companyName.error}
              iconPath="auth/building.svg"
            />
            <InputGroup
              label="السجل التجاري أو رقم الترخيص"
              type="text"
              placeholder="رقم السجل التجارى"
              required
              name="licenseNumber"
              value={whiteLabelData.paymentData.licenseNumber.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  paymentData: {
                    ...whiteLabelData.paymentData,
                    licenseNumber: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.paymentData.licenseNumber.error}
              iconPath="auth/document.svg"
            />
            <InputGroup
              label="الرقم الضريبى (optional)"
              type="text"
              placeholder="ادخل الرقم الضريبى"
              required
              name="licenseNumber"
              value={whiteLabelData.paymentData.licenseNumber.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  paymentData: {
                    ...whiteLabelData.paymentData,
                    licenseNumber: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.paymentData.licenseNumber.error}
              iconPath="auth/document.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
