import React, { useState } from "react";
import styles from "./stepTwo.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";

const StepTwo = () => {
  const [whiteLabelData, setWhiteLabelData] = useState({
    loginData: {
      email: { value: "", error: "" },
      domain: { value: "", error: "" },
    },
  });
  return (
    <div className={styles.container}>
      <StepTitle
        title="تفاصيل الخدمة أو المتجر"
        description="عرّف الزوار بخدماتك والمجالات التي تغطيها."
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title="نسخة من السجل التجارى (اختيارى)"
            icon="/svg/auth/document.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <InputGroup
              label="البريد الالكترونى"
              type="text"
              placeholder="أدخل البريد الالكترونى"
              required
              name="email"
              value={whiteLabelData.loginData.email.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  loginData: {
                    ...whiteLabelData.loginData,
                    email: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.loginData.email.error}
              iconPath="auth/building.svg"
            />
            <InputGroup
              label="الموقع الالكترونى"
              type="text"
              placeholder="أدخل الموقع الالكترونى
"
              required
              name="domain"
              value={whiteLabelData.loginData.domain.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  loginData: {
                    ...whiteLabelData.loginData,
                    domain: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.loginData.domain.error}
              iconPath="auth/building.svg"
            />
          </div>
        </div>
        <div className={styles.section}>
          <SectionTitle
            title="نبذة عن الخدمة"
            icon="/svg/auth/setting-gear.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <InputGroup
              label="البريد الالكترونى"
              type="text"
              placeholder="أدخل البريد الالكترونى"
              required
              name="email"
              value={whiteLabelData.loginData.email.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  loginData: {
                    ...whiteLabelData.loginData,
                    email: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.loginData.email.error}
              iconPath="auth/building.svg"
            />
            <InputGroup
              label="الموقع الالكترونى"
              type="text"
              placeholder="أدخل الموقع الالكترونى
"
              required
              name="domain"
              value={whiteLabelData.loginData.domain.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  loginData: {
                    ...whiteLabelData.loginData,
                    domain: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.loginData.domain.error}
              iconPath="auth/building.svg"
            />
          </div>
        </div>
        <div className={styles.section}>
          <SectionTitle
            title="المقر الرئيسي للمنشأة"
            icon="/svg/auth/location.svg"
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

export default StepTwo;
