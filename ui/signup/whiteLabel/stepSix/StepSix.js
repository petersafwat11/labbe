import React, { useEffect } from "react";
import styles from "./stepSix.module.css";
import { StepTitle } from "../../../commen/title/SectionTitle";
import SectionTitle from "../../../commen/title/SectionTitle";
import { useTranslation } from "react-i18next";

const StepSix = ({
  whiteLabelData,
  setWhiteLabelData,
  onStepValidationChange,
  goToPreviousStep,
}) => {
  const { t } = useTranslation("signup");

  useEffect(() => {
    // Summary step is always considered valid to allow moving to the next step (submission)
    onStepValidationChange(true);
  }, [onStepValidationChange]);

  const renderSummarySection = (title, icon, data, fields) => {
    return (
      <div className={styles.section}>
        <SectionTitle title={title} icon={icon} height={24} width={24} />
        <div className={styles.summary_content}>
          {fields.map((field) => {
            const fieldData = data[field.key];
            if (!fieldData || !fieldData.value) return null;

            let displayValue = fieldData.value;

            // Handle different data types
            if (Array.isArray(fieldData.value)) {
              displayValue =
                fieldData.value.length > 0
                  ? fieldData.value.join(", ")
                  : "None selected";
            }

            return (
              <div key={field.key} className={styles.summary_item}>
                <span className={styles.summary_label}>{field.label}:</span>
                <span className={styles.summary_value}>
                  {field.type === "color" ? (
                    <div className={styles.color_preview}>
                      <div
                        className={styles.color_swatch}
                        style={{ backgroundColor: fieldData.value }}
                      />
                      <span>{fieldData.value}</span>
                    </div>
                  ) : field.type === "logo" ? (
                    <img
                      src={fieldData.value}
                      alt="Logo"
                      className={styles.logo_preview}
                    />
                  ) : (
                    displayValue
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title={t("signupForm.whiteLabel.summary.title")}
        description={t("signupForm.whiteLabel.summary.description")}
        onArrowClick={() => {
          console.log("StepSix previous arrow clicked!");
          goToPreviousStep();
        }}
      />

      <div className={styles.sections}>
        {/* Identity Summary */}
        {renderSummarySection(
          t("signupForm.whiteLabel.identity.title"),
          "/svg/auth/user.svg",
          whiteLabelData.identity,
          [
            {
              key: "arabic_name",
              label: t("signupForm.whiteLabel.identity.arabicName.label"),
              type: "text",
            },
            {
              key: "english_name",
              label: t("signupForm.whiteLabel.identity.englishName.label"),
              type: "text",
            },
            {
              key: "logo",
              label: t("signupForm.whiteLabel.identity.logo.title"),
              type: "logo",
            },
            {
              key: "primaryColor",
              label: t("signupForm.whiteLabel.identity.primaryColor.label"),
              type: "color",
            },
            {
              key: "secondaryColor",
              label: t("signupForm.whiteLabel.identity.secondaryColor.label"),
              type: "color",
            },
            {
              key: "fontFamily",
              label: t("signupForm.whiteLabel.identity.fontFamily.label"),
              type: "text",
            },
          ]
        )}

        {/* Login Data Summary */}
        {renderSummarySection(
          t("signupForm.whiteLabel.login.title"),
          "/svg/auth/email.svg",
          whiteLabelData.loginData,
          [
            {
              key: "email",
              label: t("signupForm.whiteLabel.login.fields.email.label"),
              type: "text",
            },
            {
              key: "domain",
              label: t("signupForm.whiteLabel.login.fields.domain.label"),
              type: "text",
            },
          ]
        )}

        {/* System Requirements Summary */}
        {renderSummarySection(
          t("signupForm.whiteLabel.requirements.title"),
          "/svg/auth/settings.svg",
          whiteLabelData.systemRequirements,
          [
            {
              key: "numberOfEvents",
              label: t(
                "signupForm.whiteLabel.requirements.fields.numberOfEvents.label"
              ),
              type: "text",
            },
            {
              key: "numberOfGuestsPerEvent",
              label: t(
                "signupForm.whiteLabel.requirements.fields.numberOfGuestsPerEvent.label"
              ),
              type: "text",
            },
            {
              key: "eventsTypes",
              label: t(
                "signupForm.whiteLabel.requirements.fields.eventsTypes.label"
              ),
              type: "array",
            },
            {
              key: "services",
              label: t(
                "signupForm.whiteLabel.requirements.fields.services.label"
              ),
              type: "array",
            },
          ]
        )}

        {/* Additional Services Summary */}
        {whiteLabelData.additionalServices &&
          whiteLabelData.additionalServices.length > 0 && (
            <div className={styles.section}>
              <SectionTitle
                title={t("signupForm.whiteLabel.services.title")}
                icon="/svg/auth/services.svg"
                height={24}
                width={24}
              />
              <div className={styles.summary_content}>
                <div className={styles.summary_item}>
                  <span className={styles.summary_label}>
                    {t("signupForm.whiteLabel.services.selectedServices")}:
                  </span>
                  <span className={styles.summary_value}>
                    {whiteLabelData.additionalServices.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          )}

        {/* Payment Data Summary */}
        {renderSummarySection(
          t("signupForm.whiteLabel.payment.title"),
          "/svg/auth/payment.svg",
          whiteLabelData.paymentData,
          [
            {
              key: "companyName",
              label: t(
                "signupForm.whiteLabel.payment.company.fields.name.label"
              ),
              type: "text",
            },
            {
              key: "licenseNumber",
              label: t(
                "signupForm.whiteLabel.payment.company.fields.license.label"
              ),
              type: "text",
            },
            {
              key: "TaxNumber",
              label: t(
                "signupForm.whiteLabel.payment.company.fields.tax.label"
              ),
              type: "text",
            },
            {
              key: "city",
              label: t(
                "signupForm.whiteLabel.payment.address.fields.city.label"
              ),
              type: "text",
            },
            {
              key: "neighborhood",
              label: t(
                "signupForm.whiteLabel.payment.address.fields.neighborhood.label"
              ),
              type: "text",
            },
            {
              key: "street",
              label: t(
                "signupForm.whiteLabel.payment.address.fields.street.label"
              ),
              type: "text",
            },
            {
              key: "buildingNumber",
              label: t(
                "signupForm.whiteLabel.payment.address.fields.buildingNumber.label"
              ),
              type: "text",
            },
            {
              key: "additionalNumber",
              label: t(
                "signupForm.whiteLabel.payment.address.fields.additionalNumber.label"
              ),
              type: "text",
            },
            {
              key: "placeType",
              label: t(
                "signupForm.whiteLabel.payment.address.fields.placeType.label"
              ),
              type: "text",
            },
            {
              key: "placeNumber",
              label: t(
                "signupForm.whiteLabel.payment.address.fields.placeNumber.label"
              ),
              type: "text",
            },
            {
              key: "paymentMethod",
              label: t("signupForm.whiteLabel.payment.paymentMethods.title"),
              type: "array",
            },
          ]
        )}
      </div>
    </div>
  );
};

export default StepSix;
