"use client";
import { StepTitle } from "@/ui/commen/title/SectionTitle";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./createEvent.module.css";
import TemplateForm from "./TemplateForm";
import TextArea from "@/ui/commen/inputs/inputGroup/TextArea";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { useFormContext } from "react-hook-form";
import TemplateCard from "@/ui/commen/templateCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export const templates = [
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
function Step4() {
  const { t } = useTranslation("createEvent");
  const pathname = usePathname();
  const locale = pathname.split("/")[1]; // Extract locale from URL path
  const { setValue, watch } = useFormContext();
  const [isTemplatePopupOpen, setIsTemplatePopupOpen] = useState(false);

  const invitationSettings = watch("invitationSettings") || {};
  const selectedTemplate = invitationSettings.selectedTemplate;
  const handleTemplateSelect = (template) => {
    setValue("invitationSettings.selectedTemplate", template);
    setIsTemplatePopupOpen(true);
  };

  const handleTemplatePopupClose = () => {
    setIsTemplatePopupOpen(false);
  };

  const isLg = useMediaQuery("(min-width: 1024px)");

  const TemplatesGrid = () => {
    return (
      <div className={styles.templatesContainer}>
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate?.id === template.id}
            onSelect={handleTemplateSelect}
          />
        ))}
      </div>
    );
  };

  const TemplatesSwiper = () => {
    return (
      <div className={styles.templatesContainer} style={{ marginTop: "24px" }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            375: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {templates.map((template) => (
            <SwiperSlide key={template.id}>
              <TemplateCard
                template={template}
                isSelected={selectedTemplate?.id === template.id}
                onSelect={handleTemplateSelect}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return (
    <div>
      <StepTitle
        title={t("customize_invitation")}
        description={t("customize_invitation_description")}
      />

      {/* Template Selection */}
      {isLg ? TemplatesGrid() : TemplatesSwiper()}

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
          locale={locale}
        />
      )}
    </div>
  );
}

export default Step4;
