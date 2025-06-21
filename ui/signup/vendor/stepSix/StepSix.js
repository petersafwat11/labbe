import React from "react";
import styles from "./stepSix.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../../../commen/title/SectionTitle";
import SectionTitle from "../../../commen/title/SectionTitle";

const StepSix = ({ vendorData, setVendorData }) => {
  const handleInputChange = (section, field, value) => {
    setVendorData({
      ...vendorData,
      [section]: {
        ...vendorData[section],
        [field]: { value, error: "" },
      },
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title="روابط إضافية (اختياري)"
        description="أضف روابط انترنت إضافية للتعريف على عملكم."
      />
      <div className={styles.sections}>
        {/* Social Media and Links Section */}
        <div className={styles.section}>
          <SectionTitle
            title="روابط وسائل التواصل الاجتماعي"
            icon="/svg/auth/global.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label="رابط انستقرام"
              type="url"
              placeholder="أدخل رابط انستقرام"
              name="instagramLink"
              value={vendorData.otherLinksAndData.instagramLink.value}
              onChange={(e) =>
                handleInputChange(
                  "otherLinksAndData",
                  "instagramLink",
                  e.target.value
                )
              }
              error={vendorData.otherLinksAndData.instagramLink.error}
              iconPath="auth/instagram.svg"
            />
            <InputGroup
              label="رابط لينكد إن"
              type="url"
              placeholder="أدخل رابط لينكد إن"
              name="linkedinLink"
              value={vendorData.otherLinksAndData.linkedinLink?.value || ""}
              onChange={(e) =>
                handleInputChange(
                  "otherLinksAndData",
                  "linkedinLink",
                  e.target.value
                )
              }
              error={vendorData.otherLinksAndData.linkedinLink?.error || ""}
              iconPath="auth/linkedin.svg"
            />
            <InputGroup
              label="رابط موقع إلكتروني"
              type="url"
              placeholder="أدخل رابط الموقع الإلكتروني"
              name="websiteLink"
              value={vendorData.otherLinksAndData.websiteLink.value}
              onChange={(e) =>
                handleInputChange(
                  "otherLinksAndData",
                  "websiteLink",
                  e.target.value
                )
              }
              error={vendorData.otherLinksAndData.websiteLink.error}
              iconPath="auth/link.svg"
            />
          </div>
        </div>

        {/* Additional Information Section */}
        <div className={styles.section}>
          <SectionTitle
            title="معلومات إضافية"
            icon="/svg/auth/document-text.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label="أدخل الخدمة الثانوية والاستشارات"
              type="text"
              placeholder="اكتب عن الخدمات الإضافية والاستشارات التي تقدمها"
              name="additionalServices"
              value={
                vendorData.otherLinksAndData.additionalServices?.value || ""
              }
              onChange={(e) =>
                handleInputChange(
                  "otherLinksAndData",
                  "additionalServices",
                  e.target.value
                )
              }
              error={
                vendorData.otherLinksAndData.additionalServices?.error || ""
              }
              iconPath="auth/briefcase.svg"
            />
          </div>
        </div>

        {/* File Upload Section */}
        <div className={styles.section}>
          <SectionTitle
            title="الملفات والمستندات"
            icon="/svg/auth/folder.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label="ملف شخصي"
              type="text"
              placeholder="رابط ملف شخصي أو CV"
              name="cv"
              value={vendorData.otherLinksAndData.cv.value}
              onChange={(e) =>
                handleInputChange("otherLinksAndData", "cv", e.target.value)
              }
              error={vendorData.otherLinksAndData.cv.error}
              iconPath="auth/document.svg"
            />
            <InputGroup
              label="ملف تعريفي"
              type="text"
              placeholder="رابط ملف تعريفي بالخدمات"
              name="profileFile"
              value={vendorData.otherLinksAndData.profileFile?.value || ""}
              onChange={(e) =>
                handleInputChange(
                  "otherLinksAndData",
                  "profileFile",
                  e.target.value
                )
              }
              error={vendorData.otherLinksAndData.profileFile?.error || ""}
              iconPath="auth/profile.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSix;
