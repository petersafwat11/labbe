import React, { useState } from "react";
import styles from "./stepOne.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputGroup/InputGroup";
const StepOne = () => {
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
  return (
    <div className={styles.container}>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h3 className={styles.section_title}>
            {" "}
            <Image
              src="/svg/auth/personal-info.svg"
              alt="personal info"
              width={24}
              height={24}
            />{" "}
            المعلومات الشخصية
          </h3>
          <div className={styles.inputs}>
            <InputGroup
              label="اسم الجهة أو العلامة التجارية (بالعربية)
"
              type="text"
              placeholder="أدخل اسم المنظمة بالعربية
"
              required
              placement="left"
              name="arabic_name"
              value={whiteLabelData.identity.arabic_name.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  identity: {
                    ...whiteLabelData.identity,
                    arabic_name: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.identity.arabic_name.error}
              iconPath="auth/building.svg"
            />
            <InputGroup
              label="اسم الجهة أو العلامة التجارية (بالانجليزية)
"
              type="text"
              placeholder="أدخل اسم المنظمة بالانجليزية
"
              required
              placement="left"
              name="english_name"
              value={whiteLabelData.identity.english_name.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  identity: {
                    ...whiteLabelData.identity,
                    english_name: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.identity.english_name.error}
              iconPath="auth/building.svg"
            />
          </div>
        </div>
        <div className={styles.section}>
          <h3 className={styles.section_title}>
            {" "}
            <Image
              src="/svg/auth/logo.svg"
              alt="logo"
              width={24}
              height={24}
            />{" "}
            الشعار
          </h3>
          <Image src="/svg/auth/logo-2.svg" alt="logo" width={24} height={24} />{" "}
          <p className={styles.section_description}>
            ارفع الشعار بصيغة عالية الجودة
          </p>
          <button className={styles.upload_button}>اختر ملف </button>
        </div>

        <div className={styles.section}>
          <h3 className={styles.section_title}>
            {" "}
            <Image
              src="/svg/auth/color.svg"
              alt="color"
              width={24}
              height={24}
            />{" "}
            الوان العلامة التجارية
          </h3>
          <div className={styles.inputs}>
            <InputGroup
              label="اللون الاساسى"
              type="color"
              placeholder="ادخل اللون الاساسى"
              required
              placement="left"
              name="primaryColor"
              value={whiteLabelData.identity.primaryColor.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  identity: {
                    ...whiteLabelData.identity,
                    primaryColor: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.identity.primaryColor.error}
            />
            <InputGroup
              label="اللون الثانوى"
              type="color"
              placeholder="ادخل اللون الثانوى"
              required
              placement="left"
              name="secondaryColor"
              value={whiteLabelData.identity.secondaryColor.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  identity: {
                    ...whiteLabelData.identity,
                    secondaryColor: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.identity.secondaryColor.error}
            />
          </div>
        </div>
        <div className={styles.section}>
          <h3 className={styles.section_title}>
            {" "}
            <Image
              src="/svg/auth/text.svg"
              alt="font"
              width={24}
              height={24}
            />{" "}
            المعلومات شخصية
          </h3>
          <InputGroup
            label="اسم الخط ( اختيارى)"
            type="text"
            placeholder="ادخل اسم الفونت مثل : roboto,inter"
            required
            placement="left"
            name="fontFamily"
            value={whiteLabelData.identity.fontFamily.value}
            onChange={(e) =>
              setWhiteLabelData({
                ...whiteLabelData,
                identity: {
                  ...whiteLabelData.identity,
                  fontFamily: { value: e.target.value, error: "" },
                },
              })
            }
            error={whiteLabelData.identity.fontFamily.error}
            iconPath="svg/auth/font.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
