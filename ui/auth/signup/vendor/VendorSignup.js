"use client";
import React, { useState, useCallback, useEffect } from "react";
import Stepper from "../../../commen/stepper/Stepper";
import styles from "./vendorSignup.module.css";
import FormHeader from "@/ui/commen/formHeader/FormHeader";
import StepOne from "./stepOne/StepOne";
import StepTwo from "./stepTwo/StepTwo";
import StepThree from "./stepThree/StepThree";
import StepFour from "./stepFive/StepFive";
import StepFive from "./stepFour/StepFour";
import StepSix from "./stepSix/StepSix";
import { StepTitle } from "../../../commen/title/SectionTitle";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { vendorSchema } from "@/utils/schemas/vendorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStepHandler, validateStep } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import StepSeven from "./stepSeven/StepSeven";
import { authAPI, handleAPIError } from "@/lib/auth";
import { toastUtils } from "@/utils/toastUtils";

const VendorSignup = () => {
  const { t } = useTranslation("signup");
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = parseInt(searchParams.get("step"), 10) || 1;
  const [step, setStep] = useState(initialStep);
  const [currentStepValidity, setCurrentStepValidity] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, desc: t("signupForm.vendor.steps.identity") },
    { id: 2, desc: t("signupForm.vendor.steps.serviceData") },
    { id: 3, desc: t("signupForm.vendor.steps.samplesAndPackages") },
    { id: 4, desc: t("signupForm.vendor.steps.commercialVerification") },
    { id: 5, desc: t("signupForm.vendor.steps.paymentData") },
    { id: 6, desc: t("signupForm.vendor.steps.otherLinksAndData") },
    { id: 7, desc: t("signupForm.vendor.steps.summary") },
  ];

  const methods = useForm({
    resolver: zodResolver(vendorSchema(t)),
    reValidateMode: "onSubmit",
    shouldFocusError: false,
    mode: "onTouched",
  });

  console.log(
    "vendor Values errors",
    methods.watch(),
    methods.formState.errors
  );

  const isLg = useMediaQuery("(min-width: 1024px)");

  // Map step to fields for validation
  const stepFieldsMap = {
    1: ["identity"],
    2: ["serviceData"],
    3: ["samplesAndPackages"],
    4: ["paymentData"],
    5: ["commercialVerification"],
    6: ["otherLinksAndData"],
    7: ["summary"],
  };

  const handleSetStep = useCallback(
    (newStep) => {
      if (newStep > step && !currentStepValidity) {
        // Prevent moving to the next step if the current one is invalid
        return;
      }
      setStep(newStep);
      const params = new URLSearchParams(window.location.search);
      params.set("step", newStep);
      router.replace(`?${params.toString()}`);
    },
    [step, currentStepValidity, router]
  );

  const handleNext = (e) => {
    e.preventDefault();
    const isValid = validateStep({
      schema: vendorSchema(t),
      fields: stepFieldsMap[step],
      watch: methods.watch,
      setError: methods.setError,
    });
    if (isValid) {
      setCurrentStepValidity(isValid);
      handleSetStep(step + 1);
    }
  };

  const handleSubmitVendor = async () => {
    setIsSubmitting(true);
    try {
      const formData = methods.getValues();

      console.log("Submitting Vendor data:", formData);

      // Extract files from form data
      const extractedFiles = {
        portfolioImages: formData.samplesAndPackages?.portfolioImages || [],
        businessLogo: formData.samplesAndPackages?.businessLogo?.[0] || null,
        pricePackages: formData.samplesAndPackages?.pricePackages || [],
        commercialRecord:
          formData.commercialVerification?.commercialRecord?.[0] || null,
        cv: formData.otherLinksAndData?.cv?.[0] || null,
        profileFile: formData.otherLinksAndData?.profileFile?.[0] || null,
      };

      console.log("Extracted files:", extractedFiles);

      // Clean form data (remove file objects)
      const cleanFormData = {
        identity: formData.identity,
        serviceData: formData.serviceData,
        samplesAndPackages: {
          // Remove file fields, keep other data
          ...formData.samplesAndPackages,
          portfolioImages: undefined,
          businessLogo: undefined,
          pricePackages: undefined,
        },
        commercialVerification: {
          ...formData.commercialVerification,
          commercialRecord: undefined,
        },
        paymentData: formData.paymentData,
        otherLinksAndData: {
          ...formData.otherLinksAndData,
          cv: undefined,
          profileFile: undefined,
        },
      };

      // Submit to backend
      const response = await authAPI.signupVendor(
        cleanFormData,
        extractedFiles
      );

      console.log("Vendor signup successful:", response);

      // Show success message
      toastUtils.success(
        "Vendor account created successfully! You can now login."
      );

      // Redirect to success page or login
      router.push("/en/login");
    } catch (error) {
      console.error("Vendor signup error:", error);
      const errorMessage = handleAPIError(error);
      toastUtils.error(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinalSubmit = methods.handleSubmit((data) => {
    handleSubmitVendor();
  });

  const goToPreviousStep = useCallback(() => {
    console.log("goToPreviousStep triggered. Current step:", step);
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
      console.log("Navigating to previous step:", step - 1);
    }
  }, [step]);

  useEffect(() => {
    setCurrentStepValidity(false);
  }, [step]);

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        {isLg && (
          <div className={styles.stepper_container}>
            <Stepper
              step={step}
              setStep={handleSetStep}
              steps={steps}
              isCurrentStepValid={currentStepValidity}
            />
          </div>
        )}

        <div className={styles.page_content}>
          <div className={styles.top_text}>
            <h2 className={styles.top_text_title}>
              {t("signupForm.vendor.title")}
            </h2>
            <p className={styles.top_text_description}>
              {t("signupForm.vendor.description")}
            </p>
          </div>

          {!isLg && (
            <Stepper
              step={step}
              setStep={handleSetStep}
              steps={steps}
              isCurrentStepValid={currentStepValidity}
            />
          )}

          <div className={styles.page_container}>
            <div className={styles.form_container}>
              <div className={styles.form_content}>
                <div className={styles.step_container}>
                  {step === 1 ? (
                    <StepOne handleNext={handleNext} />
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
                  ) : step === 7 ? (
                    <StepSeven goToPreviousStep={goToPreviousStep} />
                  ) : null}
                </div>
                <div className={styles.buttons}>
                  <button
                    className={`${styles.confirm_button} ${styles.active}`}
                    type="button"
                    onClick={step === steps.length ? onFinalSubmit : handleNext}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "جاري الإرسال..."
                      : step === steps.length
                      ? t("signupForm.vendor.summary.submit")
                      : t("signupForm.initialForm.buttons.continueButton")}
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

export default VendorSignup;
