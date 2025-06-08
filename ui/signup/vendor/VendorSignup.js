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

  const steps = [
    "معلومات الحساب الأساسية",
    "تفاصيل الخدمة أو المتجر",
    "الصور والعروض والأسعار",
    "التحقق التجاري",
    "سياسة التعامل والدفع",
    "سياسة التعامل والدفع",
    "روابط إضافية (اختياري)",
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
            <StepOne vendorData={vendorData} setVendorData={setVendorData} />
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
