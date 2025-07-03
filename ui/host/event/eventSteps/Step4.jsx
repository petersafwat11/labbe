"use client";
import { StepTitle } from "@/ui/commen/title/SectionTitle";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./createEvent.module.css";
import TemplateForm from "./TemplateForm";
import TextArea from "@/ui/commen/inputs/inputGroup/TextArea";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
function Step4() {
  const { t } = useTranslation("createEvent");
  const [isOpen, setIsOpen] = useState(true);
  const templates = [
    {
      id: 1,
      image: "/svg/events/template1.svg",
    },
    {
      id: 2,
      image: "/svg/events/template2.svg",
    },
    {
      id: 3,
      image: "/svg/events/template3.svg",
    },
    {
      id: 4,
      image: "/svg/events/template1.svg",
    },
    {
      id: 5,
      image: "/svg/events/template2.svg",
    },
    {
      id: 6,
      image: "/svg/events/template3.svg",
    },
    {
      id: 7,
      image: "/svg/events/template1.svg",
    },
    {
      id: 8,
      image: "/svg/events/template2.svg",
    },
    {
      id: 9,
      image: "/svg/events/template3.svg",
    },
  ];
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  return (
    <div>
      <StepTitle
        title={t("customize_invitation")}
        description={t("customize_invitation_description")}
      />
      <div className={styles.templatesContainer}>
        {templates.map((template, index) => (
          <div
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            key={index}
            className={styles.templateItem}
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
                onClick={() => setIsOpen(true)}
              >
                {t("choose")}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.formContainer}>
        <TextArea
          name="invitationMessage"
          label={t("invitation_message")}
          placeholder={t("invitation_message_placeholder")}
        />
        <InputGroup
          name="resenceReply"
          label={t("attendance_auto_reply")}
          placeholder={t("attendance_auto_reply_placeholder")}
        />
        <InputGroup
          name="absenceReply"
          label={t("absence_auto_reply")}
          placeholder={t("absence_auto_reply_placeholder")}
        />

        <InputGroup
          name="expectedReply"
          label={t("expected_attendance_auto_reply")}
          placeholder={t("expected_attendance_auto_reply_placeholder")}
        />
        <InputGroup
          label={t("add_note_optional")}
          placeholder={t("add_note_placeholder")}
          name="note"
        />
      </div>

      <TemplateForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default Step4;
