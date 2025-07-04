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
import { supervisorColumns } from "@/ui/commen/table/columns/supervisor-columns";
import Table from "@/ui/commen/table";

function Step3() {
  const { t } = useTranslation("createEvent");
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [currentSupervisor, setCurrentSupervisor] = useState({
    name: "",
    phone: "",
  });

  const [localErrors, setLocalErrors] = useState({});

  const resetCurrentSupervisor = () => {
    setCurrentSupervisor({
      name: "",
      phone: "",
    });
    setLocalErrors({});
  };

  // Watch the supervisorsList to get current values
  const supervisorsList = watch("supervisorsList") || [];

  const handleInputChange = (field, value) => {
    setCurrentSupervisor((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (localErrors[field]) {
      setLocalErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateSupervisor = () => {
    const newErrors = {};

    // Align with zod schema validation
    if (!currentSupervisor.name || !currentSupervisor.name.trim()) {
      newErrors.name = "This field is required";
    }

    if (!currentSupervisor.phone || !currentSupervisor.phone.trim()) {
      newErrors.phone = "This field is required";
    } else if (currentSupervisor.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSupervisor = () => {
    if (!validateSupervisor()) return;

    const newSupervisor = {
      ...currentSupervisor,
      id: Date.now(), // Use timestamp as unique ID
    };

    const updatedSupervisorsList = [...supervisorsList, newSupervisor];
    setValue("supervisorsList", updatedSupervisorsList);
    resetCurrentSupervisor();
  };

  const handleEditSupervisor = (id) => {
    if (!validateSupervisor()) return;

    const updatedSupervisor = { ...currentSupervisor, id };
    const updatedSupervisorsList = supervisorsList.map((sup) =>
      sup.id === id ? updatedSupervisor : sup
    );
    setValue("supervisorsList", updatedSupervisorsList);
    resetCurrentSupervisor();
  };

  const handleRemoveSupervisor = (id) => {
    const updatedSupervisorsList = supervisorsList.filter(
      (sup) => sup.id !== id
    );

    setValue("supervisorsList", updatedSupervisorsList);

    if (currentSupervisor.id === id) {
      resetCurrentSupervisor();
    }
  };

  const handleEditSupervisorClick = (id) => {
    const supervisor = supervisorsList.find((sup) => sup.id === id);
    if (supervisor) {
      setCurrentSupervisor(supervisor);
    }
  };

  const isEditing = currentSupervisor.id !== undefined;

  return (
    <div>
      <StepTitle title={t("add_supervisors")} description={""} />

      <CardLayout
        style={{ marginTop: "2.4rem", padding: "1.6rem", display: "block" }}
      >
        <div className={styles.add_manually}>{t("add_manually")}</div>

        <div className={styles.formFields}>
          <div className={styles.row}>
            <div className={styles.col}>
              <InputGroup
                label={t("supervisor_name")}
                placeholder={t("supervisor_name_placeholder")}
                required
                value={currentSupervisor.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={localErrors.name}
              />
            </div>
            <div className={styles.col}>
              <MobileInputGroup
                label={t("supervisor_phone")}
                placeholder={t("supervisor_phone_placeholder")}
                type="tel"
                value={currentSupervisor.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={localErrors.phone}
              />
            </div>
          </div>

          <div className={styles.addGuestButton}>
            <Button
              variant="secondary"
              title={isEditing ? t("edit") : t("add")}
              type="button"
              onClick={
                isEditing
                  ? () => handleEditSupervisor(currentSupervisor.id)
                  : handleAddSupervisor
              }
            />

            {isEditing && (
              <Button
                variant="outline"
                title={t("cancel")}
                type="button"
                onClick={resetCurrentSupervisor}
                style={{ marginLeft: "1rem" }}
              />
            )}
          </div>
        </div>
      </CardLayout>

      {/* Supervisors Table */}
      {supervisorsList.length > 0 && (
        <div style={{ marginTop: "2.4rem" }}>
          <Table
            columns={supervisorColumns({
              onDelete: handleRemoveSupervisor,
              focusSupervisor: handleEditSupervisorClick,
            })}
            data={supervisorsList}
          />
        </div>
      )}

      {/* Schema validation error display */}
      {errors.supervisorsList && (
        <div className={styles.schemaError}>
          <p>{errors.supervisorsList.message}</p>
        </div>
      )}
    </div>
  );
}

export default Step3;
