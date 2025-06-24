import React, { useState, useEffect } from "react";
import styles from "./stepOne.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../../../commen/title/SectionTitle";
import SectionTitle from "../../../commen/title/SectionTitle";
import { useTranslation } from "react-i18next";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { whiteLabelSchema } from "@/utils/schemas/whiteLabelSchema";
import ColorPickerGroup from "@/ui/commen/inputs/inputGroup/ColorPickerGroup";
import LogoUpload from "@/ui/commen/inputs/LogoUpload";

const StepOne = ({ onLogoFileChange }) => {
  const { t } = useTranslation("signup");

  return (
    <div className={styles.container}>
      <StepTitle
        title={t("signupForm.whiteLabel.identity.title")}
        description={t("signupForm.whiteLabel.identity.description")}
      />
      <form className={styles.form}>
        <div className={styles.sections}>
          <div className={styles.section}>
            <SectionTitle
              title={t("signupForm.personalInfo.title")}
              icon="/svg/auth/personal-info.svg"
              height={24}
              width={24}
            />
            <div className={styles.inputs}>
              <InputGroup
                label={t("signupForm.whiteLabel.identity.arabicName.label")}
                type="text"
                placeholder={t(
                  "signupForm.whiteLabel.identity.arabicName.placeholder"
                )}
                required
                name="identity.arabic_name"
                iconPath="auth/building.svg"
              />
              <InputGroup
                label={t("signupForm.whiteLabel.identity.englishName.label")}
                type="text"
                placeholder={t(
                  "signupForm.whiteLabel.identity.englishName.placeholder"
                )}
                required
                name="identity.english_name"
                iconPath="auth/building.svg"
              />
            </div>
          </div>

          <div className={styles.section}>
            <SectionTitle
              title={t("signupForm.whiteLabel.identity.logo.label")}
              icon="/svg/auth/logo.svg"
              height={24}
              width={24}
            />
            <LogoUpload
              name="identity.logo"
              t={t}
              styles={styles}
              onFileChange={onLogoFileChange}
            />
          </div>

          <div className={styles.section}>
            <SectionTitle
              title={(() => {
                const colorsTitle = t(
                  "signupForm.whiteLabel.identity.colors.title"
                );
                // console.log(
                //   'StepOne - Colors Title passed to SectionTitle:',
                //   colorsTitle
                // );
                return colorsTitle;
              })()}
              icon="/svg/auth/color.svg"
              height={24}
              width={24}
            />
            <div className={styles.colors}>
              <ColorPickerGroup
                label={t("signupForm.whiteLabel.identity.primaryColor.label")}
                name="identity.primaryColor"
                customColorPlaceholder={t(
                  "signupForm.whiteLabel.identity.colors.customColor"
                )}
              />
              <ColorPickerGroup
                label={t("signupForm.whiteLabel.identity.secondaryColor.label")}
                name="identity.secondaryColor"
                customColorPlaceholder={t(
                  "signupForm.whiteLabel.identity.colors.customColor"
                )}
              />
            </div>
          </div>

          <div className={styles.section}>
            <SectionTitle
              title={t("signupForm.whiteLabel.identity.fontFamily.label")}
              icon="/svg/auth/text.svg"
              height={24}
              width={24}
            />
            <InputGroup
              label={t("signupForm.whiteLabel.identity.fontFamily.label")}
              type="text"
              placeholder={t(
                "signupForm.whiteLabel.identity.fontFamily.placeholder"
              )}
              name="identity.fontFamily"
              iconPath="auth/smallcaps.svg"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
