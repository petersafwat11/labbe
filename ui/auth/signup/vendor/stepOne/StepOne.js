import React, { useState } from "react";
import styles from "./stepOne.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import MobileInputGroup from "@/ui/commen/inputs/mobileInputGroup/MobileInputGroup";
import CheckBoxItems from "@/ui/commen/inputs/checkboxItems/CheckBoxItems";
import { StepTitle } from "../../../../commen/title/SectionTitle";
import SectionTitle from "../../../../commen/title/SectionTitle";
import { useTranslation } from "react-i18next";

const StepOne = () => {
  const { t } = useTranslation("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title={t("signupForm.vendor.identity.title")}
        description={t("signupForm.vendor.identity.description")}
      />
      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.vendor.identity.businessInfo.title")}
            icon="/svg/auth/info-circle.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label={t("signupForm.vendor.identity.brandName.label")}
              type="text"
              placeholder={t(
                "signupForm.vendor.identity.brandName.placeholder"
              )}
              required
              name="identity.brandName"
              iconPath="auth/profile-circle.svg"
            />
            <InputGroup
              label={t("signupForm.vendor.identity.ownerFullName.label")}
              type="text"
              placeholder={t(
                "signupForm.vendor.identity.ownerFullName.placeholder"
              )}
              required
              name="identity.ownerFullName"
              iconPath="auth/profile-circle.svg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.vendor.identity.serviceType.title")}
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t("signupForm.vendor.identity.serviceType.options", {
                returnObjects: true,
              })}
              name="identity.serviceType"
              columns={2}
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.vendor.identity.contactInfo.title")}
            icon="/svg/auth/call-calling.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <MobileInputGroup
              label={t("signupForm.vendor.identity.phoneNumber.label")}
              type="tel"
              placeholder={t(
                "signupForm.vendor.identity.phoneNumber.placeholder"
              )}
              required
              name="identity.phoneNumber"
            />

            <InputGroup
              label={t("signupForm.vendor.identity.email.label")}
              type="email"
              placeholder={t("signupForm.vendor.identity.email.placeholder")}
              required
              name="identity.email"
              iconPath="auth/email.svg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.vendor.identity.accountSecurity.title")}
            icon="/svg/auth/password.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label={t("signupForm.vendor.identity.password.label")}
              type={showPassword ? "text" : "password"}
              placeholder={t("signupForm.vendor.identity.password.placeholder")}
              required
              name="identity.password"
              iconPath="auth/password.svg"
              iconPath2="auth/eye.svg"
              onIconClick={togglePasswordVisibility}
            />

            <InputGroup
              label={t("signupForm.vendor.identity.passwordConfirm.label")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t(
                "signupForm.vendor.identity.passwordConfirm.placeholder"
              )}
              required
              name="identity.passwordConfirm"
              iconPath="auth/password.svg"
              iconPath2="auth/eye.svg"
              onIconClick={toggleConfirmPasswordVisibility}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
