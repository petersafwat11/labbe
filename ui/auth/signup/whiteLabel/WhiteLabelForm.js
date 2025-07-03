"use client";
import React, { useState, useCallback, useEffect } from "react";
import Stepper from "../../../commen/stepper/Stepper";
import styles from "./whiteLabelform.module.css";
import StepOne from "./stepOne/StepOne";
import StepTwo from "./stepTwo/StepTwo";
import StepFour from "./stepFour/StepFour";
import StepFive from "./stepFive/StepFive";
import StepThree from "./stepThreee/StepThree";
import StepSix from "./stepSix/StepSix";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { whiteLabelSchema } from "@/utils/schemas/whiteLabelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStepHandler, validateStep, handleSetStep } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { authAPI, handleAPIError } from "@/lib/auth";
import { toastUtils } from "@/utils/toastUtils";

const WhiteLabelForm = () => {
  const { t } = useTranslation("signup");
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = parseInt(searchParams.get("step"), 10) || 1;
  const [step, setStep] = useState(initialStep);
  const [currentStepValidity, setCurrentStepValidity] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  const steps = [
    { id: 1, desc: t("signupForm.whiteLabel.steps.identity") },
    { id: 2, desc: t("signupForm.whiteLabel.steps.login") },
    { id: 3, desc: t("signupForm.whiteLabel.steps.requirements") },
    { id: 4, desc: t("signupForm.whiteLabel.steps.services") },
    { id: 5, desc: t("signupForm.whiteLabel.steps.payment") },
    { id: 6, desc: t("signupForm.whiteLabel.steps.summary") },
  ];

  const methods = useForm({
    resolver: zodResolver(whiteLabelSchema(t)),
    reValidateMode: "onSubmit",
    shouldFocusError: false,
    mode: "onTouched",
  });

  console.log(
    "WhiteLabel Form Values & Errors:",
    methods.watch(),
    methods.formState.errors
  );

  const isLg = useMediaQuery("(min-width: 1024px)");

  // Map step to fields for validation
  const stepFieldsMap = {
    1: ["identity"],
    2: ["loginData"],
    3: ["systemRequirements"],
    4: ["additionalServices"],
    5: ["paymentData"],
    // 6: [] // summary, no validation needed
  };

  const handleSetStepCallback = useCallback(
    (newStep) => {
      const success = handleSetStep({
        newStep,
        currentStep: step,
        currentStepValidity,
        router,
        maxStep: 6,
        validationRequired: true,
      });

      if (success) {
        setStep(newStep);
        console.log("currentStepValidity:", currentStepValidity);
      }
    },
    [step, currentStepValidity, router]
  );

  const handleSubmitWhiteLabel = async () => {
    setIsSubmitting(true);
    try {
      const formData = methods.getValues();

      console.log("Submitting WhiteLabel data:", formData);
      console.log("Logo file:", logoFile);

      // Submit to backend
      const response = await authAPI.signupWhiteLabel(formData, logoFile);

      console.log("WhiteLabel signup successful:", response);

      // Show success message
      toastUtils.success(
        "WhiteLabel account created successfully! You can now login."
      );

      // Redirect to success page or login
      router.push("/en/login");
    } catch (error) {
      console.error("WhiteLabel signup error:", error);
      const errorMessage = handleAPIError(error);
      toastUtils.error(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    // If we're on step 6 (summary), submit the form
    if (step === 6) {
      handleSubmitWhiteLabel();
      return;
    }

    // Validate current step
    const isValid = validateStep({
      schema: whiteLabelSchema(t),
      fields: stepFieldsMap[step],
      watch: methods.watch,
      setError: methods.setError,
    });

    if (isValid) {
      setCurrentStepValidity(isValid);
      const success = handleSetStep({
        newStep: step + 1,
        currentStep: step,
        currentStepValidity: isValid,
        router,
        maxStep: 6,
        validationRequired: false, // Already validated above
      });

      if (success) {
        setStep(step + 1);
      }
    }
  };

  const goToPreviousStep = useCallback(() => {
    console.log("goToPreviousStep triggered. Current step:", step);
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
      console.log("Navigating to previous step:", step - 1);
    }
  }, [step]);

  useEffect(() => {
    // Step 6 is always valid (summary step)
    if (step === 6) {
      setCurrentStepValidity(true);
    } else {
      setCurrentStepValidity(false);
    }
  }, [step]);

  // Function to pass down to StepOne for logo file handling
  const handleLogoFileChange = (file) => {
    setLogoFile(file);
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.form_header}>
        <FormHeader />
      </div> */}
      <FormProvider {...methods}>
        {isLg && (
          <div className={styles.stepper_container}>
            <Stepper
              step={step}
              setStep={handleSetStepCallback}
              steps={steps}
              isCurrentStepValid={currentStepValidity}
            />
          </div>
        )}

        <div className={styles.page_content}>
          <stepHeaderSection
            title={t("signupForm.whiteLabel.title")}
            description={t("signupForm.whiteLabel.description")}
          />
          {!isLg && (
            <Stepper
              step={step}
              setStep={handleSetStepCallback}
              steps={steps}
              isCurrentStepValid={currentStepValidity}
            />
          )}
          <div className={styles.page_container}>
            <div className={styles.form_container}>
              <div className={styles.form_content}>
                <div className={styles.step_container}>
                  {step === 1 ? (
                    <StepOne
                      handleNext={handleNext}
                      onLogoFileChange={handleLogoFileChange}
                    />
                  ) : step === 2 ? (
                    <StepTwo goToPreviousStep={goToPreviousStep} />
                  ) : step === 3 ? (
                    <StepThree goToPreviousStep={goToPreviousStep} />
                  ) : step === 4 ? (
                    <StepFour goToPreviousStep={goToPreviousStep} />
                  ) : step === 5 ? (
                    <StepFive goToPreviousStep={goToPreviousStep} />
                  ) : step === 6 ? (
                    <StepSix goToPreviousStep={goToPreviousStep} />
                  ) : null}
                </div>
                <div className={styles.buttons}>
                  <button
                    className={`${styles.confirm_button} ${
                      step !== steps.length ? styles.active : ""
                    }`}
                    type="button"
                    onClick={handleNext}
                    // disabled={!currentStepValidity || step === steps.length}
                  >
                    {isSubmitting
                      ? t("signupForm.submitting") || "جاري الإرسال..."
                      : step === 6
                      ? t("signupForm.initialForm.buttons.submitButton") ||
                        "إنشاء الحساب"
                      : t("signupForm.initialForm.buttons.continueButton") ||
                        "متابعة"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default WhiteLabelForm;
