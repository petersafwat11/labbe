import React, { useEffect } from "react";
import styles from "./stepFour.module.css";
import { StepTitle } from "../../../../commen/title/SectionTitle";
import SectionTitle from "../../../../commen/title/SectionTitle";
import CheckBoxItems from "@/ui/commen/inputs/checkboxItems/CheckBoxItems";
import { useTranslation } from "react-i18next";

const StepFour = ({ goToPreviousStep }) => {
  const { t } = useTranslation("signup");

  return (
    <div className={styles.container}>
      <StepTitle
        title={t("signupForm.whiteLabel.services.title")}
        description={t("signupForm.whiteLabel.services.description")}
        onArrowClick={() => {
          console.log("StepFour previous arrow clicked!");
          goToPreviousStep();
        }}
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title={t("signupForm.whiteLabel.services.title")}
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={t("signupForm.whiteLabel.services.options", {
                returnObjects: true,
              })}
              columns={1}
              name="additionalServices"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
