"use client";
import React from "react";
import styles from "./createEvent.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import InputSelect from "@/ui/commen/inputs/inputGroup/InputSelect";
import DatePicker from "@/ui/commen/inputs/datePicker";
import TimePicker from "@/ui/commen/inputs/TimePicker";
import MapInput from "@/ui/commen/inputs/MapInput";
import { useTranslation } from "react-i18next";
import { StepTitle } from "@/ui/commen/title/SectionTitle";
import { useFormContext } from "react-hook-form";

function Step1() {
  const { t } = useTranslation("createEvent");
  const {
    formState: { errors },
  } = useFormContext();

  const eventTypeOptions = [
    { label: t("wedding"), value: "wedding" },
    { label: t("birthday"), value: "birthday" },
    { label: t("graduation"), value: "graduation" },
    { label: t("meeting"), value: "meeting" },
    { label: t("conference"), value: "conference" },
    { label: t("other"), value: "other" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <StepTitle
        title={t("event_details")}
        description={t("event_details_description")}
      />
      <div className={styles.formFields}>
        <div className={styles.row}>
          <InputGroup
            label={t("title_label")}
            placeholder={t("title_placeholder")}
            name="eventDetails.title"
            type="text"
            required
          />
          <InputSelect
            label={t("type_label")}
            placeholder={t("type_placeholder")}
            name="eventDetails.type"
            required
            options={eventTypeOptions}
          />
        </div>

        <div className={styles.row}>
          <DatePicker
            name="eventDetails.date"
            label={t("date_label")}
            placeholder={t("date_placeholder")}
            required
            minDate={new Date()}
            maxDate={new Date(2025, 11, 31)}
          />
          <TimePicker
            label={t("time_label")}
            name="eventDetails.time"
            required
            hintMessage={t("time_hint")}
            placeholder="HH:MM"
          />
        </div>

        <MapInput
          name="eventDetails.location"
          label={t("location_label")}
          required
          hintMessage={t("location_hint")}
        />
      </div>

      {/* Schema validation errors */}
      {errors.eventDetails && (
        <div className={styles.schemaError}>
          <p>{errors.eventDetails.message}</p>
        </div>
      )}
    </div>
  );
}

export default Step1;
