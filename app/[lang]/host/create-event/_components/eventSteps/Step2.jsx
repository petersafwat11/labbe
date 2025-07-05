"use client";
import { StepTitle } from "@/ui/commen/title/SectionTitle";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
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
    clearErrors,
  } = useFormContext();

  const [currentGuest, setCurrentGuest] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [localErrors, setLocalErrors] = useState({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Watch the guestList to get current values
  const guestList = watch("guestList") || [];

  // Clear form errors when guestList changes
  useEffect(() => {
    if (guestList.length > 0) {
      clearErrors("guestList");
    }
  }, [guestList, clearErrors]);

  const resetCurrentGuest = () => {
    setCurrentGuest({ name: "", phone: "", email: "" });
    setLocalErrors({});
    setShowValidationErrors(false);
  };

  const handleInputChange = (field, value) => {
    setCurrentGuest((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear specific field error when user starts typing
    if (localErrors[field]) {
      setLocalErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Clear contact error when either phone or email is provided
    if ((field === "phone" || field === "email") && localErrors.contact) {
      setLocalErrors((prev) => ({
        ...prev,
        contact: "",
      }));
    }

    // Hide validation errors when user starts typing
    if (showValidationErrors) {
      setShowValidationErrors(false);
    }
  };

  const validateGuest = () => {
    const newErrors = {};

    // Name is required
    if (!currentGuest.name || !currentGuest.name.trim()) {
      newErrors.name = t("guest_name_required") || "Guest name is required";
    }

    // Either phone or email is required
    const hasPhone = currentGuest.phone && currentGuest.phone.trim();
    const hasEmail = currentGuest.email && currentGuest.email.trim();

    if (!hasPhone && !hasEmail) {
      newErrors.contact =
        t("guest_contact_required") ||
        "Either phone number or email address is required";
    }

    // Validate phone format if provided and not empty
    if (hasPhone && currentGuest.phone.trim().length < 10) {
      newErrors.phone =
        t("guest_phone_invalid") || "Phone number must be at least 10 digits";
    }

    // Validate email format if provided and not empty
    if (hasEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(currentGuest.email.trim())) {
        newErrors.email =
          t("guest_email_invalid") || "Please enter a valid email address";
      }
    }

    setLocalErrors(newErrors);
    setShowValidationErrors(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddGuest = () => {
    if (!validateGuest()) {
      return;
    }

    try {
      const newGuest = {
        ...currentGuest,
        // Ensure consistent empty string handling
        phone: currentGuest.phone?.trim() || "",
        email: currentGuest.email?.trim() || "",
        name: currentGuest.name?.trim() || "",
        id: Date.now(), // Use timestamp as unique ID
      };

      const updatedGuestList = [...guestList, newGuest];
      setValue("guestList", updatedGuestList, { shouldValidate: true });
      resetCurrentGuest();
    } catch (error) {
      console.error("Error adding guest:", error);
    }
  };

  const handleEditGuest = (id) => {
    if (!validateGuest()) {
      return;
    }

    try {
      const updatedGuest = {
        ...currentGuest,
        // Ensure consistent empty string handling
        phone: currentGuest.phone?.trim() || "",
        email: currentGuest.email?.trim() || "",
        name: currentGuest.name?.trim() || "",
        id: id,
      };

      const updatedGuestList = guestList.map((guest) =>
        guest.id === id ? updatedGuest : guest
      );

      setValue("guestList", updatedGuestList, { shouldValidate: true });
      resetCurrentGuest();
    } catch (error) {
      console.error("Error editing guest:", error);
    }
  };

  const handleRemoveGuest = (id) => {
    const updatedGuestList = guestList.filter((guest) => guest.id !== id);
    setValue("guestList", updatedGuestList, { shouldValidate: true });

    // Clear current guest if it was being edited
    if (currentGuest.id === id) {
      resetCurrentGuest();
    }
  };

  const handleEditGuestClick = (id) => {
    const guest = guestList.find((guest) => guest.id === id);
    if (guest) {
      setCurrentGuest({
        ...guest,
        // Ensure all fields have values to avoid undefined issues
        name: guest.name || "",
        phone: guest.phone || "",
        email: guest.email || "",
      });
      setLocalErrors({}); // Clear errors when editing
      setShowValidationErrors(false);
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
                error={showValidationErrors ? localErrors.name : ""}
              />
            </div>

            <div className={styles.col}>
              <MobileInputGroup
                label={t("guest_phone")}
                placeholder={t("guest_phone_placeholder")}
                type="tel"
                value={currentGuest.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={showValidationErrors ? localErrors.phone : ""}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <InputGroup
                label={t("guest_email")}
                placeholder={t("guest_email_placeholder")}
                type="email"
                value={currentGuest.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={showValidationErrors ? localErrors.email : ""}
              />
            </div>
          </div>

          {/* Contact validation error */}
          {showValidationErrors && localErrors.contact && (
            <div className={styles.contactError}>
              <p>{localErrors.contact}</p>
            </div>
          )}

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
