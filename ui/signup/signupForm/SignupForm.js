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
      arabic_name: "",
      english_name: "",
      logo: "",
      primaryColor: "",
      secondaryColor: "",
      fontFamily: "",
    },
    loginData: {
      email: "",
      domain: "",
    },
    systemRequirements: {
      numberOfEvents: "",
      numberOfGuestsPerEvent: "",
      eventsTypes: [],
      services: [],
    },
    additionalServices: [],
    paymentData: {
      companyName: "",
      licenseNumber: "",
      TaxNumber: "",
      city: "",
      neighborhood: "",
      street: "",
      buildingNumber: "",
      additionalNumber: "",
      placeType: "",
      placeNumber: "",
      paymentMethod: [],
    },
  });
  const [hostData, setHostData] = useState({
    accountData: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    companyData: {
      logo: "",
      companyName: "",
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
