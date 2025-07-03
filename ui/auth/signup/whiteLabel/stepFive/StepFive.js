import React, { useEffect } from "react";
import styles from "./stepFive.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../../../../commen/title/SectionTitle";
import SectionTitle from "../../../../commen/title/SectionTitle";
import CheckBoxItems from "@/ui/commen/inputs/checkboxItems/CheckBoxItems";
import { useTranslation } from "react-i18next";

const StepFive = ({ goToPreviousStep }) => {
  const { t } = useTranslation("signup");

  return (
    <div className={styles.container}>
      <StepTitle
        title={t("signupForm.whiteLabel.payment.title")}
        description={t("signupForm.whiteLabel.payment.description")}
        onArrowClick={() => {
          console.log("StepFive previous arrow clicked!");
          goToPreviousStep();
        }}
      />

      <div className={styles.sections}>
        {/* Company Information Section */}
        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.whiteLabel.payment.company.title")}
            icon="/svg/auth/building.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <InputGroup
              label={t(
                "signupForm.whiteLabel.payment.company.fields.name.label"
              )}
              type="text"
              placeholder={t(
                "signupForm.whiteLabel.payment.company.fields.name.placeholder"
              )}
              required
              name="paymentData.companyName"
              iconPath="auth/building.svg"
            />

            <InputGroup
              label={t(
                "signupForm.whiteLabel.payment.company.fields.license.label"
              )}
              type="text"
              placeholder={t(
                "signupForm.whiteLabel.payment.company.fields.license.placeholder"
              )}
              required
              name="paymentData.licenseNumber"
              iconPath="auth/document.svg"
            />
            <InputGroup
              label={t(
                "signupForm.whiteLabel.payment.company.fields.tax.label"
              )}
              type="text"
              placeholder={t(
                "signupForm.whiteLabel.payment.company.fields.tax.placeholder"
              )}
              name="paymentData.TaxNumber"
              iconPath="auth/document.svg"
            />
          </div>
        </div>

        {/* National Address Section */}
        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.whiteLabel.payment.address.title")}
            icon="/svg/auth/location.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <div className={styles.row}>
              <InputGroup
                label={t(
                  "signupForm.whiteLabel.payment.address.fields.city.label"
                )}
                type="text"
                placeholder={t(
                  "signupForm.whiteLabel.payment.address.fields.city.placeholder"
                )}
                required
                name={"paymentData.city"}
                iconPath="auth/location.svg"
              />
              <InputGroup
                label={t(
                  "signupForm.whiteLabel.payment.address.fields.neighborhood.label"
                )}
                type="text"
                placeholder={t(
                  "signupForm.whiteLabel.payment.address.fields.neighborhood.placeholder"
                )}
                required
                name="paymentData.neighborhood"
                iconPath="auth/location.svg"
              />
            </div>

            <InputGroup
              label={t(
                "signupForm.whiteLabel.payment.address.fields.street.label"
              )}
              type="text"
              placeholder={t(
                "signupForm.whiteLabel.payment.address.fields.street.placeholder"
              )}
              required
              name="paymentData.street"
              iconPath="auth/location.svg"
            />

            <div className={styles.row}>
              <InputGroup
                label={t(
                  "signupForm.whiteLabel.payment.address.fields.buildingNumber.label"
                )}
                type="text"
                placeholder={t(
                  "signupForm.whiteLabel.payment.address.fields.buildingNumber.placeholder"
                )}
                required
                name="paymentData.buildingNumber"
                iconPath="auth/location.svg"
              />
              <InputGroup
                label={t(
                  "signupForm.whiteLabel.payment.address.fields.additionalNumber.label"
                )}
                type="text"
                placeholder={t(
                  "signupForm.whiteLabel.payment.address.fields.additionalNumber.placeholder"
                )}
                name="paymentData.additionalNumber"
                iconPath="auth/location.svg"
              />
            </div>

            <div className={styles.row}>
              <InputGroup
                label={t(
                  "signupForm.whiteLabel.payment.address.fields.placeType.label"
                )}
                type="text"
                placeholder={t(
                  "signupForm.whiteLabel.payment.address.fields.placeType.placeholder"
                )}
                name="paymentData.placeType"
                iconPath="auth/location.svg"
              />
              <InputGroup
                label={t(
                  "signupForm.whiteLabel.payment.address.fields.placeNumber.label"
                )}
                type="text"
                placeholder={t(
                  "signupForm.whiteLabel.payment.address.fields.placeNumber.placeholder"
                )}
                name="paymentData.placeNumber"
                iconPath="auth/location.svg"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.whiteLabel.payment.paymentMethods.title")}
            // icon="/svg/auth/payment-method.svg"
            height={24}
            width={24}
          />

          <div className={styles.options}>
            <CheckBoxItems
              items={t("signupForm.whiteLabel.payment.paymentMethods.options", {
                returnObjects: true,
              })}
              name={"paymentData.paymentMethod"}
              columns={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
