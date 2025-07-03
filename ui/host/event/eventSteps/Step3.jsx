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
  const { setValue, watch } = useFormContext();
  const [currentSupervisor, setCurrentSupervisor] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  function resetCurrentSupervisor() {
    setCurrentSupervisor({
      name: "",
      email: "",
      phone: "",
      role: "",
    });
    setErrors({ name: "", email: "", phone: "", role: "" });
  }
  // Watch the supervisorsList to get current values
  const supervisorsList = watch("supervisorsList") || [];

  const handleInputChange = (field, value) => {
    setCurrentSupervisor((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateSupervisor = () => {
    const newErrors = {};
    if (!currentSupervisor.name.trim())
      newErrors.name = t("supervisor_name_required");
    if (!currentSupervisor.phone.trim())
      newErrors.phone = t("supervisor_phone_required");
    if (!currentSupervisor.role.trim())
      newErrors.role = t("supervisor_role_required");
    if (!currentSupervisor.email.trim()) {
      newErrors.email = t("supervisor_email_required");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(currentSupervisor.email)) {
        newErrors.email = t("supervisor_email_invalid");
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSupervisor = () => {
    if (!validateSupervisor()) return;
    const updatedSupervisorsList = [
      ...supervisorsList,
      { ...currentSupervisor, id: supervisorsList.length },
    ];
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

  function focusSupervisor(id) {
    const supervisor = supervisorsList.find((sup) => sup.id === id);
    setCurrentSupervisor(supervisor);
  }

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
                error={errors.name}
              />
            </div>
            <div className={styles.col}>
              <MobileInputGroup
                label={t("supervisor_phone")}
                placeholder={t("supervisor_phone_placeholder")}
                type="tel"
                name="phone"
                value={currentSupervisor.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={errors.phone}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <InputGroup
                label={t("supervisor_email")}
                placeholder={t("supervisor_email_placeholder")}
                type="email"
                required
                value={currentSupervisor.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={errors.email}
              />
            </div>
            <div className={styles.col}>
              <InputGroup
                label={t("supervisor_role")}
                placeholder={t("supervisor_role_placeholder")}
                type="text"
                required
                value={currentSupervisor.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                error={errors.role}
              />
            </div>
          </div>
          <div className={styles.addGuestButton}>
            <Button
              variant="secondary"
              title={
                currentSupervisor.id || currentSupervisor.id === 0
                  ? t("edit")
                  : t("add")
              }
              type="button"
              onClick={
                currentSupervisor.id || currentSupervisor.id === 0
                  ? () => handleEditSupervisor(currentSupervisor.id)
                  : handleAddSupervisor
              }
            />
          </div>
        </div>
      </CardLayout>
      <Table
        columns={supervisorColumns({
          focusSupervisor,
          onDelete: handleRemoveSupervisor,
        })}
        data={supervisorsList.map((sup) => ({
          id: sup.id,
          name: sup.name,
          phone: sup.phone,
          email: sup.email,
          role: sup.role,
          //   invitedBy: sup.invitedBy,
        }))}
      />
    </div>
  );
}

export default Step3;
