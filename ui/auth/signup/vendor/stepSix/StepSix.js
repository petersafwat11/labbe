import React from "react";
import styles from "./stepSix.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../../../../commen/title/SectionTitle";
import SectionTitle from "../../../../commen/title/SectionTitle";
import UploadFile from "@/ui/commen/inputs/uploadFile/UploadFile";
import { useTranslation } from "react-i18next";

const StepSix = ({ goToPreviousStep }) => {
  const { t } = useTranslation("signup");

  return (
    <div className={styles.container}>
      <StepTitle
        title={t("signupForm.vendor.otherLinksAndData.title")}
        description={t("signupForm.vendor.otherLinksAndData.description")}
        onArrowClick={goToPreviousStep}
      />
      <div className={styles.sections}>
        {/* Social Media and Links Section */}
        <div className={styles.section}>
          <SectionTitle
            title="الروابط الاجتماعية"
            icon="/svg/auth/link.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label={t(
                "signupForm.vendor.otherLinksAndData.instagramLink.label"
              )}
              type="url"
              placeholder={t(
                "signupForm.vendor.otherLinksAndData.instagramLink.placeholder"
              )}
              name="otherLinksAndData.instagramLink"
              iconPath="auth/instagram.svg"
            />
            <InputGroup
              label={t("signupForm.vendor.otherLinksAndData.websiteLink.label")}
              type="url"
              placeholder={t(
                "signupForm.vendor.otherLinksAndData.websiteLink.placeholder"
              )}
              name="otherLinksAndData.websiteLink"
              iconPath="auth/link.svg"
            />
          </div>
        </div>

        {/* File Uploads Section */}
        <div className={styles.section}>
          <SectionTitle
            title="الملفات والمستندات"
            icon="/svg/auth/document.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <UploadFile
              name="otherLinksAndData.cv"
              multiple={false}
              placeholder={t(
                "signupForm.vendor.otherLinksAndData.cv.placeholder"
              )}
            />

            <UploadFile
              name="otherLinksAndData.profileFile"
              multiple={false}
              placeholder={t(
                "signupForm.vendor.otherLinksAndData.profileFile.placeholder"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSix;
