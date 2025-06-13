"use client";
import React, { useState } from "react";
import Stepper from "../../commen/stepper/Stepper";
import styles from "./vendorSignup.module.css";
import FormHeader from "@/ui/commen/formHeader/FormHeader";
import StepOne from "./stepOne/StepOne";
import StepTwo from "./stepTwo/StepTwo";
import StepThree from "./stepThree/StepThree";
import StepFour from "./stepFour/StepFour";
import StepFive from "./stepFive/StepFive";
import StepSix from "./stepSix/StepSix";
import { StepTitle } from "../whiteLabel/title/SectionTitle";

const VendorSignup = () => {
  const [step, setStep] = useState(1);
  const [vendorData, setVendorData] = useState({
    identity: {
      brandName: { value: "", error: "" },
      ownerFullName: { value: "", error: "" },
      serviceType: { value: [], error: "" },
      phoneNumber: { value: "", error: "" },
      email: { value: "", error: "" },
    },
    serviceData: {
      commercialRegister: { value: "", error: "" },
      idNumber: { value: "", error: "" },
      serviceDescription: { value: "", error: "" },
      eventPlanning: { value: [], error: "" },
      mediaProduction: { value: [], error: "" },
      giftsAndGiveaways: { value: [], error: "" },
      foodAndBeverages: { value: [], error: "" },
      beautyAndFashion: { value: [], error: "" },
      logisticsAndDelivery: { value: [], error: "" },
      corporateServices: { value: [], error: "" },
      city: { value: "", error: "" },
      coverageArea: { value: [], error: "" },
      otherData: { value: "", error: "" },
    },
    samplesAndPackages: {
      portfolioImages: {
        value: [],
        error: "",
      },
      businessLogo: {
        value: [],
        error: "",
      },
      pricePackages: {
        value: "",
        error: "",
      },
    },
    commercialVerification: {
      commercialRegistrationCopy: { value: "", error: "" },
      nationalOrResidencyId: { value: "", error: "" },
      otherData: { value: "", error: "" },
    },
    paymentData: {
      payment_type: { value: "", error: "" },
      // paymentMethod: { value: [], error: "" },
      termsForRefund: { value: false, error: "" },
    },
    otherLinksAndData: {
      instagramLink: { value: "", error: "" },
      linkedinLink: { value: "", error: "" },
      websiteLink: { value: "", error: "" },
      additionalServices: { value: "", error: "" },
      cv: { value: "", error: "" },
      profileFile: { value: "", error: "" },
    },
  });

  const initialStepOneData = React.useMemo(() => ({
    brandName: vendorData.identity.brandName.value,
    ownerFullName: vendorData.identity.ownerFullName.value,
    serviceType: vendorData.identity.serviceType.value || [],
    phoneNumber: vendorData.identity.phoneNumber.value,
    email: vendorData.identity.email.value
  }), [vendorData.identity]);

  const handleStepOneComplete = (data) => {
    setVendorData((prevData) => {
      let identityChanged = false;
      const newIdentity = {};

      // Check each field in 'data' against the current 'prevData.identity'
      // to see if its value has actually changed. If not changed, reuse the old object reference.
      // If changed, create a new object for that field.

      if (data.brandName !== prevData.identity.brandName.value) {
        newIdentity.brandName = { value: data.brandName, error: '' };
        identityChanged = true;
      } else {
        newIdentity.brandName = prevData.identity.brandName;
      }

      if (data.ownerFullName !== prevData.identity.ownerFullName.value) {
        newIdentity.ownerFullName = { value: data.ownerFullName, error: '' };
        identityChanged = true;
      } else {
        newIdentity.ownerFullName = prevData.identity.ownerFullName;
      }

      // For serviceType, need to compare arrays
      const newServiceType = data.serviceType || [];
      const oldServiceType = prevData.identity.serviceType.value || [];
      if (newServiceType.length !== oldServiceType.length || !newServiceType.every((val, idx) => val === oldServiceType[idx])) {
        newIdentity.serviceType = { value: newServiceType, error: '' };
        identityChanged = true;
      } else {
        newIdentity.serviceType = prevData.identity.serviceType;
      }

      if (data.phoneNumber !== prevData.identity.phoneNumber.value) {
        newIdentity.phoneNumber = { value: data.phoneNumber, error: '' };
        identityChanged = true;
      } else {
        newIdentity.phoneNumber = prevData.identity.phoneNumber;
      }

      if (data.email !== prevData.identity.email.value) {
        newIdentity.email = { value: data.email, error: '' };
        identityChanged = true;
      } else {
        newIdentity.email = prevData.identity.email;
      }

      // If identity has actually changed (based on content), return a new state object.
      // Otherwise, return the previous state object to prevent unnecessary re-renders.
      if (identityChanged) {
        return {
          ...prevData,
          identity: newIdentity,
        };
      } else {
        return prevData;
      }
    });
    // Optionally move to the next step here
    // setStep(2);
  };

  const steps = [
    { id: 1, desc: "معلومات الحساب الأساسية" },
    { id: 2, desc: "تفاصيل الخدمة أو المتجر" },
    { id: 3, desc: "الصور والعروض والأسعار" },
    { id: 4, desc: "التحقق التجاري" },
    { id: 5, desc: "سياسة التعامل والدفع" },
    { id: 6, desc: "روابط إضافية (اختياري)" }
  ];

  return (
    <div>
      <FormHeader />
      <StepTitle
        title="أكمل ملفك الشخصى"
        description="اتبع الخطوات التالية لإنشاء حسابك كمقدم خدمة وبدء عرض خدماتك على منصة لبّى."
      />
      <div className={styles.form_container}>
        <div className={styles.step_container}>
          {step === 1 ? (
            <StepOne
              initialData={initialStepOneData}
              onStepComplete={handleStepOneComplete}
            />
          ) : step === 2 ? (
            <StepTwo vendorData={vendorData} setVendorData={setVendorData} />
          ) : step === 3 ? (
            <StepThree vendorData={vendorData} setVendorData={setVendorData} />
          ) : step === 4 ? (
            <StepFour vendorData={vendorData} setVendorData={setVendorData} />
          ) : step === 5 ? (
            <StepFive vendorData={vendorData} setVendorData={setVendorData} />
          ) : step === 6 ? (
            <StepSix vendorData={vendorData} setVendorData={setVendorData} />
          ) : null}
        </div>
        <div className={styles.stepper_container}>
          <Stepper step={step} setStep={setStep} steps={steps} />
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;
