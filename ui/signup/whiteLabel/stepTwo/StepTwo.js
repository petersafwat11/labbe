import React from "react";
import styles from "./stepTwo.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";

const StepTwo = ({ whiteLabelData, setWhiteLabelData }) => {
  const handleInputChange = (section, field, value) => {
    setWhiteLabelData({
      ...whiteLabelData,
      [section]: {
        ...whiteLabelData[section],
        [field]: { value, error: "" },
      },
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title="بيانات الدخول والتخصيص"
        description="خصّص الدخول لمنصتك وحدد النطاق واللغة المناسبة."
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title="بيانات التخصيص والدخول"
            icon="/svg/auth/personal-info.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <InputGroup
              label="البريد الإلكتروني الرسمي للحساب الإداري"
              type="email"
              placeholder="أدخل البريد الإلكترونى"
              required
              name="email"
              value={whiteLabelData.loginData.email.value}
              onChange={(e) =>
                handleInputChange("loginData", "email", e.target.value)
              }
              error={whiteLabelData.loginData.email.error}
              iconPath="auth/building.svg"
            />
            <InputGroup
              label="النطاق الفرعي المفضل"
              type="url"
              placeholder="ادخل النطاق الفرعى"
              required
              name="domain"
              value={whiteLabelData.loginData.domain.value}
              onChange={(e) =>
                handleInputChange("loginData", "domain", e.target.value)
              }
              error={whiteLabelData.loginData.domain.error}
              iconPath="auth/building.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
