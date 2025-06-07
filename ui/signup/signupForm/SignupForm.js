"use client";
import React, { useState } from "react";
import styles from "./signupForm.module.css";
import FormHeader from "@/ui/commen/formHeader/FormHeader";
import InputGroup from "@/ui/commen/inputGroup/InputGroup";
const SignupForm = () => {
  const [data, setData] = useState({
    name: "",
    service: "",
  });
  const [whiteLabelData, setWhiteLabelData] = useState({
    identity: {
      arabic_name: { value: "", error: "" },
      english_name: { value: "", error: "" },
      logo: { value: "", error: "" },
      primaryColor: { value: "", error: "" },
      secondaryColor: { value: "", error: "" },
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
  const [hostData, setHostData] = useState({
    accountData: {
      name: { value: "", error: "" },
      email: { value: "", error: "" },
      password: { value: "", error: "" },
      confirmPassword: { value: "", error: "" },
    },
    companyData: {
      logo: { value: "", error: "" },
      companyName: { value: "", error: "" },
    },
  });
  return (
    <div className={styles.container}>
      <FormHeader />
      <div className={styles.top}>
        <h2 className={styles.title}>أكمل ملفك الشخصى</h2>
        <p className={styles.description}>
          أكمل ملفك الشخصى للاستفادة من خدماتنا
        </p>
      </div>
      <div className={styles.form}>
        <h3 className={styles.form_title}>المعلومات شخصية </h3>
        <InputGroup
          label="الاسم"
          placeholder="الاسم"
          type="text"
          name="name"
          value={name}
        />
      </div>
    </div>
  );
};

export default SignupForm;
