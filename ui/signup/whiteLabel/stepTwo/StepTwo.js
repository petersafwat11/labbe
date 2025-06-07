import React, { useState } from "react";
import styles from "./stepOne.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputGroup/InputGroup";
const StepOne = () => {
  const [whiteLabelData, setWhiteLabelData] = useState({
    loginData: {
      email: { value: "", error: "" },
      domain: { value: "", error: "" },
    },
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
            المعلومات الشخصية
          </h3>
          <div className={styles.inputs}>
            <InputGroup
              label="البريد الالكترونى"
              type="text"
              placeholder="أدخل البريد الالكترونى
"
              required
              placement="left"
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
              iconPath="auth/email.svg"
            />
            <InputGroup
              label="الموقع الالكترونى"
              type="text"
              placeholder="أدخل الموقع الالكترونى
"
              required
              placement="left"
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
              iconPath="auth/domain.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
