"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import Button from "@/ui/commen/button/Button";
import { accountSettingsSchema } from "@/utils/schemas/accountSettingsSchema";
import styles from "./accountSettings.module.css";
import { authAPI, cookieUtils } from "@/lib/auth";
import { hostAPI } from "@/lib/host";
import { toastUtils } from "@/utils/toastUtils";
import OtpInput from "@/ui/commen/inputs/optInput/OtpInput";

const AccountSettings = ({ user = {} }) => {
  const { t } = useTranslation("settings");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  // Initialize React Hook Form with user data
  const methods = useForm({
    resolver: zodResolver(accountSettingsSchema(t)),
    mode: "onChange",
    defaultValues: {
      username: user.username || "",
      email: user.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isDirty, errors },
    reset,
    watch,
  } = methods;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (formData) => {
    console.log("Form submitted with data:", formData);
    setIsLoading(true);

    try {
      let response;

      // If password is being updated, use auth API
      if (formData.password) {
        response = await authAPI.updateHostAccountSettings(formData);
      } else {
        // If only profile info is being updated, use host API
        const profileData = {
          username: formData.username,
          email: formData.email,
        };
        response = await hostAPI.profile.updateProfile(profileData);
      }

      console.log("Update response:", response);

      if (response.status === "success") {
        toastUtils.success(
          response.message || t("account_updated_successfully")
        );

        // Update user cookie with the new user data
        if (response.data && (response.data.user || response.data.host)) {
          const userData = response.data.user || response.data.host;
          cookieUtils.deleteCookie("user");
          cookieUtils.setCookie("user", JSON.stringify(userData), 7);
        }

        // Reset password fields after successful update
        reset({
          username:
            response.data?.user?.username ||
            response.data?.host?.username ||
            formData.username,
          email:
            response.data?.user?.email ||
            response.data?.host?.email ||
            formData.email,
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error updating account settings:", error);
      toastUtils.error(error.message || t("account_update_failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerificationCode = async () => {
    setIsVerifyingEmail(true);
    try {
      const response = await authAPI.sendEmailVerificationCode();
      if (response.status === "success") {
        toastUtils.success(response.message || t("verification_code_sent"));
        setShowVerificationInput(true);
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      toastUtils.error(error.message || t("verification_code_send_failed"));
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toastUtils.error(t("enter_valid_verification_code"));
      return;
    }

    setIsVerifyingEmail(true);
    try {
      const response = await authAPI.verifyEmail(verificationCode);
      if (response.status === "success") {
        toastUtils.success(
          response.message || t("email_verified_successfully")
        );
        setShowVerificationInput(false);
        setVerificationCode("");

        // Update user cookie if user data is returned
        if (response.data && response.data.user) {
          cookieUtils.deleteCookie("user");
          cookieUtils.setCookie("user", JSON.stringify(response.data.user), 7);
        }
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toastUtils.error(error.message || t("email_verification_failed"));
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  // Debug function to check form state
  const handleFormSubmit = (e) => {
    handleSubmit(onSubmit)(e);
  };

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t("personal_info")}</h3>

            <div className={styles.inputsGroup}>
              <div className={styles.name_container}>
                <InputGroup
                  label={t("full_name")}
                  type="text"
                  placeholder={t("full_name_placeholder")}
                  name="username"
                  required
                  iconPath="auth/profile.svg"
                />
              </div>

              <div className={styles.email_wrapper}>
                <div className={styles.email_container}>
                  <InputGroup
                    label={t("email_address")}
                    type="email"
                    placeholder={t("email_placeholder")}
                    name="email"
                    required
                    iconPath="auth/email.svg"
                  />
                  {!showVerificationInput && (
                    <button
                      type="button"
                      className={styles.verifyButton}
                      onClick={handleSendVerificationCode}
                      disabled={isVerifyingEmail}
                    >
                      {isVerifyingEmail ? t("sending") : t("verify_email")}
                    </button>
                  )}
                </div>
                {showVerificationInput && (
                  <div className={styles.verificationInputGroup}>
                    <OtpInput
                      value={verificationCode}
                      onChange={setVerificationCode}
                    />
                    <Button
                      onClick={handleVerifyCode}
                      disabled={
                        isVerifyingEmail || verificationCode.length !== 6
                      }
                      loading={isVerifyingEmail}
                      className={styles.verifyCodeButton}
                    >
                      {isVerifyingEmail ? t("verifying") : t("verify_code")}
                    </Button>
                  </div>
                )}
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
                reset();
                setShowVerificationInput(false);
                setVerificationCode("");
              }}
            />

            <Button
              type="submit"
              variant="primary"
              title={isLoading ? t("saving") : t("save_changes")}
              disabled={!isDirty || isLoading}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AccountSettings;
