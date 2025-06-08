"use client";
import React, { useState } from "react";
import Stepper from "./stepper/Stepper";
import styles from "./whiteLabelform.module.css";
import FormHeader from "@/ui/commen/formHeader/FormHeader";
import StepOne from "./stepOne/StepOne";
import StepTwo from "./stepTwo/StepTwo";
import StepFour from "./stepFour/StepFour";
import StepFive from "./stepFive/StepFive";
import StepThree from "./stepThree/StepThree";

const WhiteLabelForm = () => {
  const [step, setStep] = useState(1);
  const [whiteLabelData, setWhiteLabelData] = useState({
    identity: {
      arabic_name: { value: "", error: "" },
      english_name: { value: "", error: "" },
      logo: { value: "", error: "" },
      primaryColor: { value: "#c28e5c", error: "" },
      secondaryColor: { value: "#d6b392", error: "" },
      fontFamily: { value: "", error: "" },
    },
    loginData: {
      email: { value: "", error: "" },
      domain: { value: "", error: "" },
    },
    systemRequirements: {
      numberOfEvents: { value: "", error: "" },
      numberOfGuestsPerEvent: { value: "", error: "" },
      eventsTypes: { value: [], error: "" },
      services: { value: [], error: "" },
    },
    additionalServices: [],
    paymentData: {
      companyName: { value: "", error: "" },
      licenseNumber: { value: "", error: "" },
      TaxNumber: { value: "", error: "" },
      city: { value: "", error: "" },
      neighborhood: { value: "", error: "" },
      street: { value: "", error: "" },
      buildingNumber: { value: "", error: "" },
      additionalNumber: { value: "", error: "" },
      placeType: { value: "", error: "" },
      placeNumber: { value: "", error: "" },
      paymentMethod: { value: [], error: "" },
    },
  });

  return (
    <div>
      {/* <div className={styles.form_header}>
        <FormHeader />
      </div> */}
      <div className={styles.top_text}>
        <h2 className={styles.top_text_title}>أكمل ملفك الشخصى</h2>
        <p className={styles.top_text_description}>
          اتبع الخوات التالية لبتاء متجرك مع لبّى وبدء تفعيلها بالشكل الذي يناسب
          علامتك التجارية.{" "}
        </p>
      </div>
      <div className={styles.form_container}>
        <div className={styles.step_container}>
          {step === 1 ? (
            <StepOne
              whiteLabelData={whiteLabelData}
              setWhiteLabelData={setWhiteLabelData}
            />
          ) : step === 2 ? (
            <StepTwo
              whiteLabelData={whiteLabelData}
              setWhiteLabelData={setWhiteLabelData}
            />
          ) : step === 3 ? (
            <StepThree
              whiteLabelData={whiteLabelData}
              setWhiteLabelData={setWhiteLabelData}
            />
          ) : step === 4 ? (
            <StepFour
              whiteLabelData={whiteLabelData}
              setWhiteLabelData={setWhiteLabelData}
            />
          ) : step === 5 ? (
            <StepFive
              whiteLabelData={whiteLabelData}
              setWhiteLabelData={setWhiteLabelData}
            />
          ) : null}
        </div>
        <div className={styles.stepper_container}>
          <Stepper step={step} setStep={setStep} />
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelForm;
