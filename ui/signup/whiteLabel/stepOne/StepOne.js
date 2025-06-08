import React, { useState } from "react";
import styles from "./stepOne.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";

const StepOne = ({ whiteLabelData, setWhiteLabelData }) => {
  const [logoFile, setLogoFile] = useState(null);

  // Predefined color options
  const colorOptions = [
    "#c28e5c",
    "#d6b392",
    "#8b6f47",
    "#a0845c",
    "#e74c3c",
    "#3498db",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
    "#34495e",
    "#95a5a6",
  ];

  const handleInputChange = (section, field, value) => {
    setWhiteLabelData({
      ...whiteLabelData,
      [section]: {
        ...whiteLabelData[section],
        [field]: { value, error: "" },
      },
    });
  };

  const handleColorSelect = (color, colorType) => {
    handleInputChange("identity", colorType, color);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoFile(file);
      handleInputChange("identity", "logo", file.name);
    }
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title="الهوية البصرية"
        description="أدخل بيانات العلامة التجارية الخاصة بك بدقة ليتم عرضها على منصتك."
      />
      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title="المعلومات الشخصية"
            icon="/svg/auth/personal-info.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label="اسم الجهة أو العلامة التجارية (بالعربية)"
              type="text"
              placeholder="أدخل اسم المنظمة بالعربية"
              required
              name="arabic_name"
              value={whiteLabelData.identity.arabic_name.value}
              onChange={(e) =>
                handleInputChange("identity", "arabic_name", e.target.value)
              }
              error={whiteLabelData.identity.arabic_name.error}
              iconPath="auth/building.svg"
            />
            <InputGroup
              label="اسم الجهة أو العلامة التجارية (بالانجليزية)"
              type="text"
              placeholder="أدخل اسم المنظمة بالانجليزية"
              required
              name="english_name"
              value={whiteLabelData.identity.english_name.value}
              onChange={(e) =>
                handleInputChange("identity", "english_name", e.target.value)
              }
              error={whiteLabelData.identity.english_name.error}
              iconPath="auth/building.svg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title="الشعار"
            icon="/svg/auth/logo.svg"
            height={24}
            width={24}
          />
          <div className={styles.logo_upload}>
            <Image
              src="/svg/auth/logo-2.svg"
              alt="logo"
              width={24}
              height={24}
            />
            <p className={styles.section_description}>
              ارفع الشعار بصيغة عالية الجودة
            </p>
            <label className={styles.upload_button}>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ display: "none" }}
              />
              اختر ملف
            </label>
            {logoFile && (
              <p className={styles.file_selected}>تم اختيار: {logoFile.name}</p>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title="الوان العلامة التجارية"
            icon="/svg/auth/color.svg"
            height={24}
            width={24}
          />

          <div className={styles.color_section}>
            {/* Primary Color Selection */}
            <div className={styles.colors}>
              <h4 className={styles.color_label}>اللون الاساسى</h4>
              <div className={styles.custom_color}>
                <div className={styles.color_inputs}>
                  <input
                    type="color"
                    value={whiteLabelData.identity.primaryColor.value}
                    onChange={(e) =>
                      handleColorSelect(e.target.value, "primaryColor")
                    }
                    className={styles.color_picker}
                  />
                  <input
                    placeholder="لون مخصص"
                    value={whiteLabelData.identity.primaryColor.value}
                    onChange={(e) =>
                      handleColorSelect(e.target.value, "primaryColor")
                    }
                    className={styles.color_picker_input}
                  />
                </div>
                {/* <span className={styles.custom_color_text}>لون مخصص</span> */}
              </div>
            </div>

            {/* Secondary Color Selection */}
            <div className={styles.color_section}>
              <h4 className={styles.color_label}>اللون الثانوى</h4>
              <div className={styles.custom_color}>
                <input
                  type="color"
                  value={whiteLabelData.identity.secondaryColor.value}
                  onChange={(e) =>
                    handleColorSelect(e.target.value, "secondaryColor")
                  }
                  className={styles.color_picker}
                />
                <input
                  placeholder="لون مخصص"
                  value={whiteLabelData.identity.secondaryColor.value}
                  onChange={(e) =>
                    handleColorSelect(e.target.value, "secondaryColor")
                  }
                  className={styles.color_picker_input}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title="نوع الخط"
            icon="/svg/auth/text.svg"
            height={24}
            width={24}
          />
          <InputGroup
            label="اسم الخط (اختيارى)"
            type="text"
            placeholder="ادخل اسم الفونت مثل : roboto, inter"
            name="fontFamily"
            value={whiteLabelData.identity.fontFamily.value}
            onChange={(e) =>
              handleInputChange("identity", "fontFamily", e.target.value)
            }
            error={whiteLabelData.identity.fontFamily.error}
            iconPath="auth/smallcaps.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
