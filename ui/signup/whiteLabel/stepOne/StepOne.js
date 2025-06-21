import React, { useState, useEffect } from "react";
import styles from "./stepOne.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../../../commen/title/SectionTitle";
import SectionTitle from "../../../commen/title/SectionTitle";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const StepOne = ({ initialData, onStepComplete, onStepValidationChange }) => {
  const { t } = useTranslation("signup");
  const [logoFile, setLogoFile] = useState(null);

  // Define validation schema
  const identitySchema = z.object({
    arabic_name: z
      .string()
      .min(2, t("signupForm.whiteLabel.identity.errors.arabicNameMinLength"))
      .max(50, t("signupForm.whiteLabel.identity.errors.arabicNameMaxLength"))
      .regex(
        /^[\u0600-\u06FF\s]+$/,
        t("signupForm.whiteLabel.identity.errors.arabicNameFormat")
      ),
    english_name: z
      .string()
      .min(2, t("signupForm.whiteLabel.identity.errors.englishNameMinLength"))
      .max(50, t("signupForm.whiteLabel.identity.errors.englishNameMaxLength"))
      .regex(
        /^[a-zA-Z\s]+$/,
        t("signupForm.whiteLabel.identity.errors.englishNameFormat")
      ),
    logo: z
      .string()
      .min(1, t("signupForm.whiteLabel.identity.errors.logoRequired")),
    primaryColor: z
      .string()
      .min(1, t("signupForm.whiteLabel.identity.errors.primaryColorRequired"))
      .regex(
        /^#[0-9A-Fa-f]{6}$/,
        t("signupForm.whiteLabel.identity.errors.invalidColorFormat")
      ),
    secondaryColor: z
      .string()
      .min(1, t("signupForm.whiteLabel.identity.errors.secondaryColorRequired"))
      .regex(
        /^#[0-9A-Fa-f]{6}$/,
        t("signupForm.whiteLabel.identity.errors.invalidColorFormat")
      ),
    fontFamily: z
      .string()
      .optional()
      .refine((val) => !val || /^[a-zA-Z\s]+$/.test(val), {
        message: t("signupForm.whiteLabel.identity.errors.invalidFontFamily"),
      }),
  });

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(identitySchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  // Watch form values
  const formValues = watch();

  // Report validation status to parent
  useEffect(() => {
    onStepValidationChange(isValid);
  }, [isValid, onStepValidationChange]);

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

  const handleInputChange = async (field, value) => {
    setValue(field, value);
    await trigger(field); // Trigger validation for the field
  };

  const handleColorSelect = async (color, colorType) => {
    await handleInputChange(colorType, color);
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setValue("logo", "");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setValue("logo", "");
        return;
      }
      setLogoFile(file);
      await handleInputChange("logo", file.name);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Validate all fields before proceeding
      const isValid = await trigger();
      if (isValid) {
        onStepComplete(data);
      }
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title={t("signupForm.whiteLabel.identity.title")}
        description={t("signupForm.whiteLabel.identity.description")}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                name="arabic_name"
                value={formValues.arabic_name}
                onChange={(e) =>
                  handleInputChange("arabic_name", e.target.value)
                }
                error={errors.arabic_name?.message}
                iconPath="auth/building.svg"
              />
              <InputGroup
                label={t("signupForm.whiteLabel.identity.englishName.label")}
                type="text"
                placeholder={t(
                  "signupForm.whiteLabel.identity.englishName.placeholder"
                )}
                required
                name="english_name"
                value={formValues.english_name}
                onChange={(e) =>
                  handleInputChange("english_name", e.target.value)
                }
                error={errors.english_name?.message}
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
            <div className={styles.logo_upload}>
              <Image
                src="/svg/auth/logo-2.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <p className={styles.section_description}>
                {t("signupForm.whiteLabel.identity.logo.description")}
              </p>

              <label className={styles.upload_button}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  style={{ display: "none" }}
                />
                {t("signupForm.whiteLabel.identity.logo.button")}
              </label>

              {logoFile && (
                <p className={styles.file_selected}>
                  {t("selected")}: {logoFile.name}
                </p>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <SectionTitle
              title={(() => {
                const colorsTitle = t(
                  "signupForm.whiteLabel.identity.colors.title"
                );
                console.log(
                  "StepOne - Colors Title passed to SectionTitle:",
                  colorsTitle
                );
                return colorsTitle;
              })()}
              icon="/svg/auth/color.svg"
              height={24}
              width={24}
            />
            <div className={styles.colors}>
              <div className={styles.color_section}>
                <h4 className={styles.color_label}>
                  {t("signupForm.whiteLabel.identity.primaryColor.label")}
                </h4>
                <div className={styles.color_options}>
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`${styles.color_option} ${
                        formValues.primaryColor === color ? styles.selected : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color, "primaryColor")}
                    />
                  ))}
                </div>
                <div className={styles.custom_color}>
                  <input
                    type="color"
                    value={formValues.primaryColor}
                    onChange={(e) =>
                      handleColorSelect(e.target.value, "primaryColor")
                    }
                    className={styles.color_picker}
                  />
                  <input
                    placeholder={t(
                      "signupForm.whiteLabel.identity.colors.customColor"
                    )}
                    value={formValues.primaryColor}
                    onChange={(e) =>
                      handleColorSelect(e.target.value, "primaryColor")
                    }
                    className={styles.color_picker_input}
                  />
                </div>
                {errors.primaryColor && (
                  <p className={styles.error}>{errors.primaryColor.message}</p>
                )}
              </div>

              <div className={styles.color_section}>
                <h4 className={styles.color_label}>
                  {t("signupForm.whiteLabel.identity.secondaryColor.label")}
                </h4>
                <div className={styles.color_options}>
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`${styles.color_option} ${
                        formValues.secondaryColor === color
                          ? styles.selected
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color, "secondaryColor")}
                    />
                  ))}
                </div>
                <div className={styles.custom_color}>
                  <input
                    type="color"
                    value={formValues.secondaryColor}
                    onChange={(e) =>
                      handleColorSelect(e.target.value, "secondaryColor")
                    }
                    className={styles.color_picker}
                  />
                  <input
                    placeholder={t(
                      "signupForm.whiteLabel.identity.colors.customColor"
                    )}
                    value={formValues.secondaryColor}
                    onChange={(e) =>
                      handleColorSelect(e.target.value, "secondaryColor")
                    }
                    className={styles.color_picker_input}
                  />
                </div>
                {errors.secondaryColor && (
                  <p className={styles.error}>
                    {errors.secondaryColor.message}
                  </p>
                )}
              </div>
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
              name="fontFamily"
              value={formValues.fontFamily}
              onChange={(e) => handleInputChange("fontFamily", e.target.value)}
              error={errors.fontFamily?.message}
              iconPath="auth/smallcaps.svg"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
