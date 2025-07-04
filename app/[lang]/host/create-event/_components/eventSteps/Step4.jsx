"use client";
import { StepTitle } from "@/ui/commen/title/SectionTitle";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./createEvent.module.css";
import TemplateForm from "./TemplateForm";
import TextArea from "@/ui/commen/inputs/inputGroup/TextArea";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { useFormContext } from "react-hook-form";

function Step4() {
  const { t } = useTranslation("createEvent");
  const { setValue, watch } = useFormContext();
  const [isTemplatePopupOpen, setIsTemplatePopupOpen] = useState(false);

  const invitationSettings = watch("invitationSettings") || {};
  const selectedTemplate = invitationSettings.selectedTemplate;

  const templates = [
    {
      id: 1,
      name: "Classic Wedding",
      image: "/svg/events/template1.svg",
      colors: { primary: "#d4af37", secondary: "#ffffff", accent: "#2c2c2c" },
    },
    {
      id: 2,
      name: "Modern Elegant",
      image: "/svg/events/template2.svg",
      colors: { primary: "#c9a96e", secondary: "#f8f8f8", accent: "#4a4a4a" },
    },
    {
      id: 3,
      name: "Romantic Rose",
      image: "/svg/events/template3.svg",
      colors: { primary: "#e91e63", secondary: "#fff5f8", accent: "#8e8e8e" },
    },
    {
      id: 4,
      name: "Garden Party",
      image: "/svg/events/template1.svg",
      colors: { primary: "#4caf50", secondary: "#f1f8e9", accent: "#2e7d32" },
    },
    {
      id: 5,
      name: "Royal Blue",
      image: "/svg/events/template2.svg",
      colors: { primary: "#1976d2", secondary: "#e3f2fd", accent: "#0d47a1" },
    },
    {
      id: 6,
      name: "Sunset Orange",
      image: "/svg/events/template3.svg",
      colors: { primary: "#ff9800", secondary: "#fff3e0", accent: "#e65100" },
    },
  ];

  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const handleTemplateSelect = (template) => {
    setValue("invitationSettings.selectedTemplate", template);
    setIsTemplatePopupOpen(true);
  };

  const handleTemplatePopupClose = () => {
    setIsTemplatePopupOpen(false);
  };

  return (
    <div>
      <StepTitle
        title={t("customize_invitation")}
        description={t("customize_invitation_description")}
      />

      {/* Template Selection */}
      <div className={styles.templatesContainer}>
        {templates.map((template) => (
          <div
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            key={template.id}
            className={`${styles.templateItem} ${
              selectedTemplate?.id === template.id ? styles.selected : ""
            }`}
          >
            <Image
              src={template.image}
              alt={template.name}
              width={100}
              height={120}
            />
            <div
              className={`${styles.overlay} ${
                hoveredTemplate === template.id ? styles.active : ""
              }`}
            >
              <button
                type="button"
                className={styles.overlayButton}
                onClick={() => handleTemplateSelect(template)}
              >
                {t("choose")}
              </button>
            </div>
            {selectedTemplate?.id === template.id && (
              <div className={styles.selectedIndicator}>
                <img
                  src="/svg/events/check-circle.svg"
                  alt="Selected"
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Template Display */}
      {selectedTemplate && (
        <div className={styles.selectedTemplate}>
          <h3>
            {t("selected_template")}: {selectedTemplate.name}
          </h3>
          <button
            type="button"
            onClick={() => setIsTemplatePopupOpen(true)}
            className={styles.editTemplateButton}
          >
            {t("edit_template")}
          </button>
        </div>
      )}

      {/* Invitation Settings Form */}
      <div className={styles.formContainer}>
        <TextArea
          name="invitationSettings.invitationMessage"
          label={t("invitation_message")}
          placeholder={t("invitation_message_placeholder")}
        />

        <InputGroup
          name="invitationSettings.attendanceAutoReply"
          label={t("attendance_auto_reply")}
          placeholder={t("attendance_auto_reply_placeholder")}
        />

        <InputGroup
          name="invitationSettings.absenceAutoReply"
          label={t("absence_auto_reply")}
          placeholder={t("absence_auto_reply_placeholder")}
        />

        <InputGroup
          name="invitationSettings.expectedAttendanceAutoReply"
          label={t("expected_attendance_auto_reply")}
          placeholder={t("expected_attendance_auto_reply_placeholder")}
        />

        <InputGroup
          label={t("add_note_optional")}
          placeholder={t("add_note_placeholder")}
          name="invitationSettings.note"
        />
      </div>

      {/* Template Customization Popup */}
      {selectedTemplate && (
        <TemplateForm
          isOpen={isTemplatePopupOpen}
          onClose={handleTemplatePopupClose}
          template={selectedTemplate}
        />
      )}
    </div>
  );
}

export default Step4;
