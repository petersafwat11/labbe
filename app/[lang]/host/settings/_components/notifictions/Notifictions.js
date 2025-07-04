"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToggleInput from "@/ui/commen/inputs/toggelInput/ToggelInput";
import Button from "@/ui/commen/button/Button";
import { notificationsSchema } from "@/utils/schemas/notifictionsSchema";
import styles from "./notifictions.module.css";

const Notifications = ({ notificationSettings = {} }) => {
  const { t } = useTranslation("settings");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize React Hook Form with notification settings
  const methods = useForm({
    resolver: zodResolver(notificationsSchema(t)),
    mode: "onChange",
    defaultValues: {
      appNotifications: {
        eventUpdates:
          notificationSettings.appNotifications?.eventUpdates ?? true,
        eventDates: notificationSettings.appNotifications?.eventDates ?? true,
        packageRenewal:
          notificationSettings.appNotifications?.packageRenewal ?? true,
        systemInteractions:
          notificationSettings.appNotifications?.systemInteractions ?? true,
      },
      emailNotifications: {
        eventUpdates:
          notificationSettings.emailNotifications?.eventUpdates ?? false,
        eventDates:
          notificationSettings.emailNotifications?.eventDates ?? false,
        packageRenewal:
          notificationSettings.emailNotifications?.packageRenewal ?? false,
        beforeSendingInvitations:
          notificationSettings.emailNotifications?.beforeSendingInvitations ??
          false,
        afterSendingInvitations:
          notificationSettings.emailNotifications?.afterSendingInvitations ??
          false,
      },
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = async (formData) => {
    setIsLoading(true);

    try {
      console.log("Notification settings data to be sent:", formData);

      // TODO: Call backend API here
      // const response = await updateNotificationSettings(formData);

      // Show success message
      // toastUtils.success(t("success_message"));
    } catch (error) {
      console.error("Error updating notification settings:", error);
      // toastUtils.error(t("error_message"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* App Notifications Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{t("app_notifications")}</h3>
              <p className={styles.sectionDescription}>
                {t("app_notifications_description")}
              </p>
            </div>

            <div className={styles.togglesGroup}>
              <ToggleInput
                name="appNotifications.eventUpdates"
                label="event_updates"
              />
              <ToggleInput
                name="appNotifications.eventDates"
                label="event_dates"
              />
              <ToggleInput
                name="appNotifications.packageRenewal"
                label="package_renewal"
              />
              <ToggleInput
                name="appNotifications.systemInteractions"
                label="system_interactions"
              />
            </div>
          </div>

          {/* Email Notifications Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                {t("email_notifications")}
              </h3>
              <p className={styles.sectionDescription}>
                {t("email_notifications_description")}
              </p>
            </div>

            <div className={styles.togglesGroup}>
              <ToggleInput
                name="emailNotifications.eventUpdates"
                label="event_updates"
              />
              <ToggleInput
                name="emailNotifications.eventDates"
                label="event_dates"
              />
              <ToggleInput
                name="emailNotifications.packageRenewal"
                label="package_renewal"
              />
              <ToggleInput
                name="emailNotifications.beforeSendingInvitations"
                label="before_sending_invitations"
              />
              <ToggleInput
                name="emailNotifications.afterSendingInvitations"
                label="after_sending_invitations"
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

export default Notifications;
