"use client";
import React from "react";
import CardLayout from "@/ui/commen/card/CardLayout";
import styles from "./templateForm.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import InputSelect from "@/ui/commen/inputs/inputGroup/InputSelect";
import DatePicker from "@/ui/commen/inputs/datePicker";
import ColorPickerGroup from "@/ui/commen/inputs/inputGroup/ColorPickerGroup";
import PopupLayout from "@/ui/commen/popup/PopupLayout";
import TextArea from "@/ui/commen/inputs/inputGroup/TextArea";
import TimePicker from "@/ui/commen/inputs/TimePicker";
import Button from "@/ui/commen/button/Button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";

const fontOptions = [
  { value: "inter", label: "Inter" },
  { value: "cairo", label: "Cairo" },
  { value: "lato", label: "Lato" },
];

function TemplateForm({ isOpen, onClose, locale }) {
  const { t } = useTranslation("createEvent");
  const isLg = useMediaQuery("(min-width: 1024px)");

  // Initialize React Hook Form
  const methods = useForm({
    defaultValues: {
      messageText: "",
      brideName: "",
      groomName: "",
      guestMessage: "",
      entryDate: null,
      entryTime: "12:00:AM",
      address: "",
      endMessage: "",
      fontType: "cairo",
      primaryColor: "#5a4a42",
    },
  });

  const { watch, handleSubmit } = methods;

  // Watch all form values for real-time updates
  const formData = watch();

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Template data:", data);
    onClose();
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    if (!date) return t("event_date_placeholder");
    try {
      return new Date(date).toLocaleDateString();
    } catch (error) {
      return t("event_date_placeholder");
    }
  };

  // Format date with separate spans for month, day, and year
  const formatDateWithSpans = (date) => {
    if (!date) {
      return <span>{t("event_date_placeholder")}</span>;
    }

    try {
      const dateObj = new Date(date);
      const monthIndex = dateObj.getMonth();
      const dayOfWeek = dateObj.getDay();
      const dayOfMonth = dateObj.getDate();
      const year = dateObj.getFullYear();

      const monthName = t(`months.${monthIndex}`);
      const dayName = t(`days.${dayOfWeek}`);

      return (
        <>
          <span className={styles.monthName}>{monthName}</span>
          <span className={styles.dayInfo}>
            {dayName} {dayOfMonth}
          </span>
          <span className={styles.yearInfo}>{year}</span>
        </>
      );
    } catch (error) {
      return <span>{t("event_date_placeholder")}</span>;
    }
  };

  // Format time with proper localization
  const formatTimeWithSpans = (timeString) => {
    if (!timeString) {
      return <span>12:00:AM</span>;
    }

    try {
      // Parse time format like "04:50:PM"
      const timeParts = timeString.split(":");
      const hour = parseInt(timeParts[0]);
      const minute = parseInt(timeParts[1]);
      const ampm = timeParts[2];

      // Check if we're in Arabic locale using the component's locale
      const isArabic = locale === "ar";

      if (isArabic) {
        // Arabic format: "فى تمام الساعة الثامنة و الدقائق مساءا"
        const arabicNumbers = [
          "",
          "الواحدة",
          "الثانية",
          "الثالثة",
          "الرابعة",
          "الخامسة",
          "السادسة",
          "السابعة",
          "الثامنة",
          "التاسعة",
          "العاشرة",
          "الحادية عشرة",
          "الثانية عشرة",
        ];

        // Convert 24-hour to 12-hour for Arabic display
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const hourInArabic = arabicNumbers[displayHour] || displayHour;
        const timeOfDay = ampm === "AM" ? t("time_am") : t("time_pm");

        return (
          <>
            <span>{t("time_prefix")}</span>
            <span> {hourInArabic}</span>
            {minute > 0 && (
              <>
                <span> {t("time_and")} </span>
                <span>
                  {minute} {t("time_minutes")}
                </span>
              </>
            )}
            <span> {timeOfDay}</span>
          </>
        );
      } else {
        // English format: "at 4:50pm"
        const hourDisplay = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const minuteDisplay = minute.toString().padStart(2, "0");
        const timeOfDay = ampm === "AM" ? t("time_am") : t("time_pm");

        return (
          <>
            <span>{t("time_prefix")} </span>
            <span>
              {hourDisplay}:{minuteDisplay}
            </span>
            <span>{timeOfDay}</span>
          </>
        );
      }
    } catch (error) {
      return <span>{timeString}</span>;
    }
  };

  return (
    <PopupLayout isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2>{t("edit_design_template")}</h2>
        <button style={{ cursor: "pointer" }} onClick={onClose}>
          <img src="/svg/events/close-circle.svg" alt="close" />
        </button>
      </div>
      <CardLayout className={styles.container}>
        <FormProvider {...methods}>
          <form className={styles.rightForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGrid}>
              <div style={{ gridColumn: "span 2" }}>
                <TextArea
                  label={t("message_text")}
                  placeholder={t("message_text_placeholder")}
                  name="messageText"
                />
              </div>
              <InputGroup
                label={t("bride_name")}
                placeholder={t("bride_name_placeholder")}
                name="brideName"
              />
              <InputGroup
                label={t("groom_name")}
                placeholder={t("groom_name_placeholder")}
                name="groomName"
              />
              <div style={{ gridColumn: "span 2" }}>
                <InputGroup
                  name="guestMessage"
                  label={t("guest_message")}
                  placeholder={t("guest_message_placeholder")}
                />
              </div>

              <DatePicker
                label={t("event_date")}
                placeholder={t("event_date_placeholder")}
                name="entryDate"
              />
              <TimePicker label={t("event_time")} name="entryTime" />

              <InputGroup
                label={t("address")}
                placeholder={t("address_placeholder")}
                name="address"
              />
              <InputGroup
                label={t("end_message")}
                placeholder={t("end_message_placeholder")}
                name="endMessage"
              />
              <InputSelect
                label={t("font_type")}
                placeholder={t("font_type_placeholder")}
                name="fontType"
                options={fontOptions}
              />
              <ColorPickerGroup
                label={t("primary_color")}
                name="primaryColor"
              />
            </div>
            {!isLg && (
              <div className={styles.buttonContainer}>
                <Button
                  variant="secondary"
                  onClick={onClose}
                  title={t("cancel")}
                  type="button"
                />
                <Button variant="primary" title={t("save")} type="submit" />
              </div>
            )}
          </form>
        </FormProvider>
        {isLg && (
          <div className={styles.leftPreview}>
            <div className={styles.templatePreview}>
              <img
                src="/svg/events/template1.svg"
                alt="invitation preview"
                className={styles.invitationBackground}
              />
              <div className={styles.templateContent}>
                <div
                  className={styles.messageText}
                  style={{
                    color: formData.primaryColor || "#5a4a42",
                    fontFamily: formData.fontType || "cairo",
                  }}
                >
                  {formData.messageText || t("message_text_placeholder")}
                </div>
                <div className={styles.brideAndGroomName}>
                  <p
                    className={styles.brideName}
                    style={{
                      color: formData.primaryColor || "#5a4a42",
                      fontFamily: formData.fontType || "cairo",
                    }}
                  >
                    {formData.brideName || t("bride_name_placeholder")}
                  </p>
                  <span className={styles.and}> & </span>
                  <p
                    className={styles.groomName}
                    style={{
                      color: formData.primaryColor || "#5a4a42",
                      fontFamily: formData.fontType || "cairo",
                    }}
                  >
                    {formData.groomName || t("groom_name_placeholder")}
                  </p>
                </div>
                <div
                  className={styles.guestMessage}
                  style={{
                    color: formData.primaryColor || "#5a4a42",
                    fontFamily: formData.fontType || "cairo",
                  }}
                >
                  {formData.guestMessage || t("guest_message_placeholder")}
                </div>
                <div
                  className={styles.entryDate}
                  style={{
                    color: formData.primaryColor || "#5a4a42",
                    fontFamily: formData.fontType || "cairo",
                  }}
                >
                  {formatDateWithSpans(formData.entryDate)}
                </div>
                <div
                  className={styles.entryTime}
                  style={{
                    color: formData.primaryColor || "#5a4a42",
                    fontFamily: formData.fontType || "cairo",
                  }}
                >
                  {formatTimeWithSpans(formData.entryTime)}
                </div>
                <div
                  className={styles.address}
                  style={{
                    color: formData.primaryColor || "#5a4a42",
                    fontFamily: formData.fontType || "cairo",
                  }}
                >
                  {formData.address || t("address_placeholder")}
                </div>
                <div
                  className={styles.endMessage}
                  style={{
                    color: formData.primaryColor || "#5a4a42",
                    fontFamily: formData.fontType || "cairo",
                  }}
                >
                  {formData.endMessage || t("end_message_placeholder")}
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                variant="secondary"
                onClick={onClose}
                title={t("cancel")}
                type="button"
              />
              <Button
                variant="primary"
                title={t("save")}
                onClick={handleSubmit(onSubmit)}
                type="button"
              />
            </div>
          </div>
        )}
      </CardLayout>
    </PopupLayout>
  );
}

export default TemplateForm;
