import React, { useState } from "react";
import styles from "./stepOne.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";
const StepOne = () => {
  return (
    <div className={styles.container}>
      <StepTitle
        title="معلومات الحساب الأساسية"
        description="أدخل بياناتك الشخصية والتجارية لبدء إنشاء حسابك كمزود خدمة."
      />
      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title="معلومات النشاط"
            icon="/svg/auth/info-circle.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label="اسم الجهة أو العلامة التجارية (بالعربية)
"
              type="text"
              placeholder="أدخل اسم المنظمة بالعربية
"
              required
              name="arabic_name"
              value={whiteLabelData.identity.arabic_name.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  identity: {
                    ...whiteLabelData.identity,
                    arabic_name: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.identity.arabic_name.error}
              iconPath="auth/profile-circle.svg"
            />
            <InputGroup
              label="اسم الجهة أو العلامة التجارية (بالانجليزية)
"
              type="text"
              placeholder="أدخل اسم المنظمة بالانجليزية
"
              required
              name="english_name"
              value={whiteLabelData.identity.english_name.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  identity: {
                    ...whiteLabelData.identity,
                    english_name: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.identity.english_name.error}
              iconPath="auth/profile-circle.svg"
            />
          </div>
        </div>
        <div className={styles.section}>
          <SectionTitle
            title="الشعار"
            icon="/svg/auth/call-calling.svg"
            height={24}
            width={24}
          />
          <Image src="/svg/auth/logo-2.svg" alt="logo" width={24} height={24} />{" "}
          <p className={styles.section_description}>
            ارفع الشعار بصيغة عالية الجودة
          </p>
          <button className={styles.upload_button}>اختر ملف </button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
