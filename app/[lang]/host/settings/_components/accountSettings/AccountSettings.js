"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import Button from "@/ui/commen/button/Button";
import { accountSettingsSchema } from "@/utils/schemas/accountSettingsSchema";
import styles from "./accountSettings.module.css";

const AccountSettings = ({ userData = {} }) => {
  const { t } = useTranslation("settings");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize React Hook Form with user data
  const methods = useForm({
    resolver: zodResolver(accountSettingsSchema(t)),
    mode: "onChange",
    defaultValues: {
      name: userData.name || "",
      email: userData.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isDirty },
  } = methods;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Prepare data for backend
      const updateData = {
        name: formData.name,
        email: formData.email,
      };

      // Only include password if it was changed
      if (formData.password && formData.password !== "") {
        updateData.password = formData.password;
      }

      console.log("Account settings data to be sent:", updateData);

      // TODO: Call backend API here
      // const response = await updateUserData(updateData);

      // Show success message
      // toastUtils.success(t("success_message"));
    } catch (error) {
      console.error("Error updating account settings:", error);
      // toastUtils.error(t("error_message"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t("personal_info")}</h3>

            <div className={styles.inputsGroup}>
              <InputGroup
                label={t("full_name")}
                type="text"
                placeholder={t("full_name_placeholder")}
                name="name"
                required
                iconPath="auth/profile.svg"
              />
              <div style={{ display: "flex", gap: "2.4rem" }}>
                <InputGroup
                  label={t("email_address")}
                  type="email"
                  placeholder={t("email_placeholder")}
                  name="email"
                  required
                  iconPath="auth/email.svg"
                />
                <button className={styles.verifyButton}>توثيق البريد</button>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t("change_password")}</h3>
            <p className={styles.sectionDescription}>
              {t("change_password_description")}
            </p>

            <div className={styles.inputsGroup2}>
              <InputGroup
                label={t("new_password")}
                type={showPassword ? "text" : "password"}
                placeholder={t("new_password_placeholder")}
                name="password"
                iconPath="auth/password.svg"
                iconPath2="auth/eye.svg"
                onIconClick={togglePasswordVisibility}
              />

              <InputGroup
                label={t("confirm_password")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("confirm_password_placeholder")}
                name="confirmPassword"
                iconPath="auth/password.svg"
                iconPath2="auth/eye.svg"
                onIconClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              type="button"
              variant="outline"
              title={t("cancel")}
              onClick={() => {
                methods.reset();
              }}
            />

            <Button
              type="submit"
              variant="primary"
              title={t("save_changes")}
              disabled={!isDirty || isLoading}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AccountSettings;
