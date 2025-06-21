import React, { useEffect } from "react";
import styles from "./stepTwo.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../../../commen/title/SectionTitle";
import SectionTitle from "../../../commen/title/SectionTitle";
import { useTranslation } from "react-i18next";

const StepTwo = ({
  whiteLabelData,
  setWhiteLabelData,
  onStepValidationChange,
  goToPreviousStep,
}) => {
  const { t, i18n } = useTranslation("signup");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const error = !email
      ? t("signupForm.whiteLabel.login.fields.email.required")
      : !emailRegex.test(email)
      ? t("signupForm.whiteLabel.login.fields.email.invalid")
      : "";
    console.log(
      `Email validation for '${email}': ${error}, current language: ${i18n.language}`
    );
    return error;
  };

  const validateDomain = (domain) => {
    // const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    const error = !domain
      ? t("signupForm.whiteLabel.login.fields.domain.required")
      : "";
    // : !domainRegex.test(domain)
    // ? t('signupForm.whiteLabel.login.fields.domain.invalid')
    // : '';
    console.log(
      `Domain validation for '${domain}': ${error}, current language: ${i18n.language}`
    );
    return error;
  };

  const handleInputChange = (section, field, value) => {
    let error = "";

    if (field === "email") {
      error = validateEmail(value);
    } else if (field === "domain") {
      error = validateDomain(value);
    }

    setWhiteLabelData((prevData) => {
      const newData = {
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: { value, error },
        },
      };
      // After setting the new data, re-evaluate and report validity
      const isEmailValid = validateEmail(newData.loginData.email.value) === "";
      const isDomainValid =
        validateDomain(newData.loginData.domain.value) === "";
      onStepValidationChange(isEmailValid && isDomainValid);
      return newData;
    });
    console.log(
      `handleInputChange - field: ${field}, value: ${value}, error: ${error}, current language: ${i18n.language}`
    );
  };

  // Force re-render when language changes and re-validate
  useEffect(() => {
    console.log(`Language changed to: ${i18n.language}`);
    const isEmailValid =
      validateEmail(whiteLabelData.loginData.email.value) === "";
    const isDomainValid =
      validateDomain(whiteLabelData.loginData.domain.value) === "";
    onStepValidationChange(isEmailValid && isDomainValid);

    // Re-run validation on existing values to update errors based on new language
    handleInputChange(
      "loginData",
      "email",
      whiteLabelData.loginData.email.value
    );
    handleInputChange(
      "loginData",
      "domain",
      whiteLabelData.loginData.domain.value
    );
  }, [i18n.language, onStepValidationChange]);

  return (
    <div className={styles.container}>
      <StepTitle
        title={t("signupForm.whiteLabel.login.title")}
        description={t("signupForm.whiteLabel.login.description")}
        onArrowClick={goToPreviousStep}
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.whiteLabel.login.title")}
            icon="/svg/auth/personal-info.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <InputGroup
              label={t("signupForm.whiteLabel.login.fields.email.label")}
              type="email"
              placeholder={t(
                "signupForm.whiteLabel.login.fields.email.placeholder"
              )}
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
              label={t("signupForm.whiteLabel.login.fields.domain.label")}
              type="url"
              placeholder="ادخل النطاق المفضل"
              required
              name="domain"
              value={whiteLabelData.loginData.domain.value}
              onChange={(e) =>
                handleInputChange("loginData", "domain", e.target.value)
              }
              error={whiteLabelData.loginData.domain.error}
              iconPath="auth/building.svg"
              hintMessage="https://*******.labba.sa: سيكون رابط منصتك"
              prefixText="Labba.sa"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
