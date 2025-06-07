import React, { useState } from "react";
import styles from "./stepOne.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputGroup/InputGroup";
const StepFive = () => {
  const [whiteLabelData, setWhiteLabelData] = useState({
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
              src="/svg/auth/building.svg"
              alt="company info"
              width={24}
              height={24}
            />{" "}
            معلومات الشركة{" "}
          </h3>
          <div className={styles.inputs}>
            <InputGroup
              label="اسم الجهة/المنشأة الرسمية"
              type="text"
              placeholder="الاسم الرسمي للشركة
"
              required
              placement="left"
              name="companyName"
              value={whiteLabelData.paymentData.companyName.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  paymentData: {
                    ...whiteLabelData.paymentData,
                    companyName: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.paymentData.companyName.error}
              iconPath="auth/building.svg"
            />
            <InputGroup
              label="السجل التجاري أو رقم الترخيص"
              type="text"
              placeholder="رقم السجل التجارى"
              required
              placement="left"
              name="licenseNumber"
              value={whiteLabelData.paymentData.licenseNumber.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  paymentData: {
                    ...whiteLabelData.paymentData,
                    licenseNumber: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.paymentData.licenseNumber.error}
              iconPath="auth/document.svg"
            />
            <InputGroup
              label="الرقم الضريبى (optional)"
              type="text"
              placeholder="ادخل الرقم الضريبى"
              required
              placement="left"
              name="licenseNumber"
              value={whiteLabelData.paymentData.licenseNumber.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  paymentData: {
                    ...whiteLabelData.paymentData,
                    licenseNumber: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.paymentData.licenseNumber.error}
              iconPath="auth/document.svg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.section_title}>
            {" "}
            <Image
              src="/svg/auth/personal-info.svg"
              alt="personal info"
              width={24}
              height={24}
            />{" "}
            العنوان الوطنى
          </h3>
          <div className={styles.inputs}>
            <div className={styles.row}>
              <InputGroup
                label="المدينة"
                type="text"
                placeholder="اختر اسم المدينة"
                required
                placement="left"
                name="city"
                value={whiteLabelData.paymentData.city.value}
                onChange={(e) =>
                  setWhiteLabelData({
                    ...whiteLabelData,
                    paymentData: {
                      ...whiteLabelData.paymentData,
                      city: { value: e.target.value, error: "" },
                    },
                  })
                }
                error={whiteLabelData.paymentData.city.error}
                iconPath="auth/city.svg"
              />
              <InputGroup
                label="الحي"
                type="text"
                placeholder="اختر اسم الحي"
                required
                placement="left"
                name="neighborhood"
                value={whiteLabelData.paymentData.neighborhood.value}
                onChange={(e) =>
                  setWhiteLabelData({
                    ...whiteLabelData,
                    paymentData: {
                      ...whiteLabelData.paymentData,
                      neighborhood: { value: e.target.value, error: "" },
                    },
                  })
                }
                error={whiteLabelData.paymentData.neighborhood.error}
                iconPath="auth/neighborhood.svg"
              />
            </div>
            <div className={styles.row}>
              <InputGroup
                label="الشارع"
                type="text"
                placeholder="اختر اسم الشارع"
                required
                placement="left"
                name="street"
                value={whiteLabelData.paymentData.street.value}
                onChange={(e) =>
                  setWhiteLabelData({
                    ...whiteLabelData,
                    paymentData: {
                      ...whiteLabelData.paymentData,
                      street: { value: e.target.value, error: "" },
                    },
                  })
                }
                error={whiteLabelData.paymentData.street.error}
                iconPath="auth/street.svg"
              />
            </div>
            <div className={styles.row}>
              <InputGroup
                label="رقم المبنى "
                type="text"
                placeholder="ادخل رقم المبنى"
                required
                placement="left"
                name="buildingNumber"
                value={whiteLabelData.paymentData.buildingNumber.value}
                onChange={(e) =>
                  setWhiteLabelData({
                    ...whiteLabelData,
                    paymentData: {
                      ...whiteLabelData.paymentData,
                      buildingNumber: { value: e.target.value, error: "" },
                    },
                  })
                }
                error={whiteLabelData.paymentData.buildingNumber.error}
                iconPath="auth/building.svg"
              />
              <InputGroup
                label="رقم الإضافى "
                type="text"
                placeholder="ادخل الرقم الاضافى"
                required
                placement="left"
                name="additionalNumber"
                value={whiteLabelData.paymentData.additionalNumber.value}
                onChange={(e) =>
                  setWhiteLabelData({
                    ...whiteLabelData,
                    paymentData: {
                      ...whiteLabelData.paymentData,
                      additionalNumber: { value: e.target.value, error: "" },
                    },
                  })
                }
                error={whiteLabelData.paymentData.additionalNumber.error}
                iconPath="auth/building.svg"
              />
            </div>
            <div className={styles.row}>
              <InputGroup
                label="نوع الوحدة (اختيارى) "
                type="text"
                placeholder="ادخل نوع الوحدة"
                required
                placement="left"
                name="placeType"
                value={whiteLabelData.paymentData.placeType.value}
                onChange={(e) =>
                  setWhiteLabelData({
                    ...whiteLabelData,
                    paymentData: {
                      ...whiteLabelData.paymentData,
                      placeType: { value: e.target.value, error: "" },
                    },
                  })
                }
                error={whiteLabelData.paymentData.placeType.error}
                iconPath="auth/building.svg"
              />
              <InputGroup
                label="رقم الوحدة (اختيارى) "
                type="text"
                placeholder="ادخل رقم الوحدة"
                required
                placement="left"
                name="placeNumber"
                value={whiteLabelData.paymentData.placeNumber.value}
                onChange={(e) =>
                  setWhiteLabelData({
                    ...whiteLabelData,
                    paymentData: {
                      ...whiteLabelData.paymentData,
                      placeNumber: { value: e.target.value, error: "" },
                    },
                  })
                }
                error={whiteLabelData.paymentData.placeNumber.error}
                iconPath="auth/building.svg"
              />
              <InputGroup
                label="الرقم البريدى "
                type="text"
                placeholder="ادخل الرقم البريدى"
                required
                placement="left"
                name="postalCode"
                value={whiteLabelData.paymentData.postalCode.value}
                onChange={(e) =>
                  setWhiteLabelData({
                    ...whiteLabelData,
                    paymentData: {
                      ...whiteLabelData.paymentData,
                      postalCode: { value: e.target.value, error: "" },
                    },
                  })
                }
                error={whiteLabelData.paymentData.postalCode.error}
                iconPath="auth/postal-code.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <h3 className={styles.section_title}>
            {" "}
            <Image
              src="/svg/auth/personal-info.svg"
              alt="personal info"
              width={24}
              height={24}
            />{" "}
            وسائل الدفع
          </h3>
          <div className={styles.options}>
            {["تحويل بنكى", "مدى", "فاتورة"].map((item, index) => (
              <div className={styles.option} key={index}>
                <input
                  type="radio"
                  name="event_type"
                  id={`event_type_${index}`}
                />
                <label htmlFor={`event_type_${index}`}>{item}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
