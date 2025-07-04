"use client";
import { StepTitle } from "@/ui/commen/title/SectionTitle";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import CardLayout from "@/ui/commen/card/CardLayout";
import styles from "./createEvent.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { useFormContext } from "react-hook-form";
import Button from "@/ui/commen/button/Button";
import MobileInputGroup from "@/ui/commen/inputs/mobileInputGroup/MobileInputGroup";
import Table from "@/ui/commen/table";
import { temporaryGuestColumns } from "@/ui/commen/table/columns/single-event-columns";

function Step2() {
  const { t } = useTranslation("createEvent");
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [currentGuest, setCurrentGuest] = useState({
    name: "",
    phone: "",
  });

  const [localErrors, setLocalErrors] = useState({});

  // Watch the guestList to get current values
  const guestList = watch("guestList") || [];

  const resetCurrentGuest = () => {
    setCurrentGuest({ name: "", phone: "" });
    setLocalErrors({});
  };

  const handleInputChange = (field, value) => {
    setCurrentGuest((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (localErrors[field]) {
      setLocalErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateGuest = () => {
    const newErrors = {};

    // Align with zod schema validation
    if (!currentGuest.name || !currentGuest.name.trim()) {
      newErrors.name = "This field is required";
    }

    if (!currentGuest.phone || !currentGuest.phone.trim()) {
      newErrors.phone = "This field is required";
    } else if (currentGuest.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddGuest = () => {
    if (!validateGuest()) return;

    const newGuest = {
      ...currentGuest,
      id: Date.now(), // Use timestamp as unique ID
    };

    const updatedGuestList = [...guestList, newGuest];
    setValue("guestList", updatedGuestList);
    resetCurrentGuest();
  };

  const handleEditGuest = (id) => {
    if (!validateGuest()) return;

    const updatedGuest = {
      ...currentGuest,
      id: id,
    };

    const updatedGuestList = guestList.map((guest) =>
      guest.id === id ? updatedGuest : guest
    );

    setValue("guestList", updatedGuestList);
    resetCurrentGuest();
  };

  const handleRemoveGuest = (id) => {
    const updatedGuestList = guestList.filter((guest) => guest.id !== id);
    setValue("guestList", updatedGuestList);

    // Clear current guest if it was being edited
    if (currentGuest.id === id) {
      resetCurrentGuest();
    }
  };

  const handleEditGuestClick = (id) => {
    const guest = guestList.find((guest) => guest.id === id);
    if (guest) {
      setCurrentGuest(guest);
    }
  };

  const isEditing = currentGuest.id !== undefined;

  return (
    <div>
      <StepTitle
        title={t("prepare_invitation")}
        description={t("prepare_invitation_description")}
      />

      <CardLayout
        style={{ marginTop: "2.4rem", padding: "1.6rem", display: "block" }}
      >
        <div className={styles.add_manually}>{t("add_manually")}</div>

        <div className={styles.formFields}>
          <div className={styles.row}>
            <div className={styles.col}>
              <InputGroup
                label={t("guest_name")}
                placeholder={t("guest_name_placeholder")}
                required
                value={currentGuest.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={localErrors.name}
              />
            </div>

            <div className={styles.col}>
              <MobileInputGroup
                label={t("guest_phone")}
                placeholder={t("guest_phone_placeholder")}
                type="tel"
                value={currentGuest.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={localErrors.phone}
              />
            </div>
          </div>

          <div className={styles.addGuestButton}>
            <Button
              variant="secondary"
              title={isEditing ? t("edit_guest") : t("add_guest")}
              type="button"
              onClick={
                isEditing
                  ? () => handleEditGuest(currentGuest.id)
                  : handleAddGuest
              }
            />

            {isEditing && (
              <Button
                variant="outline"
                title={t("cancel")}
                type="button"
                onClick={resetCurrentGuest}
                style={{ marginLeft: "1rem" }}
              />
            )}
          </div>
        </div>
      </CardLayout>

      {/* Guest List Table */}
      {guestList.length > 0 && (
        <div style={{ marginTop: "2.4rem" }}>
          <Table
            columns={temporaryGuestColumns({
              onDelete: handleRemoveGuest,
              focusGuest: handleEditGuestClick,
            })}
            data={guestList}
            caption={t("guest_list")}
          />
        </div>
      )}

      {/* Schema validation error display */}
      {errors.guestList && (
        <div className={styles.schemaError}>
          <p>{errors.guestList.message}</p>
        </div>
      )}
    </div>
  );
}

export default Step2;
