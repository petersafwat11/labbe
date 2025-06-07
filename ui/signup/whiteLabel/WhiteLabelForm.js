"use client";
import React from "react";
import Stepper from "./stepper/Stepper";
import styles from "./whiteLabelform.module.css";
import FormHeader from "@/ui/commen/formHeader/FormHeader";

const WhiteLabelForm = () => {
  return (
    <div>
      <div className={styles.form_header}>
        <FormHeader />
      </div>

      <Stepper />
    </div>
  );
};

export default WhiteLabelForm;
