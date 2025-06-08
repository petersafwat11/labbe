import React from "react";
import styles from "./stepFive.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";
import CheckBoxItems from "@/ui/commen/checkboxItems/CheckBoxItems";

const StepFive = ({ whiteLabelData, setWhiteLabelData }) => {
  const handleInputChange = (section, field, value) => {
    setWhiteLabelData({
      ...whiteLabelData,
      [section]: {
        ...whiteLabelData[section],
        [field]: { value, error: "" },
      },
    });
  };

  const handleCheckboxChange = (item, checked) => {
    const currentValues = whiteLabelData.paymentData.paymentMethod.value;
    let newValues;

    if (checked) {
      newValues = [...currentValues, item];
    } else {
      newValues = currentValues.filter((value) => value !== item);
    }

    setWhiteLabelData({
      ...whiteLabelData,
      paymentData: {
        ...whiteLabelData.paymentData,
        paymentMethod: { value: newValues, error: "" },
      },
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title="أنشئ منصتك بيئتك الخاصة"
        description="أدخل المعلومات التفصيلية للمنشأة والدفع لتستطيع تلقي الدفعات والعمل القانوني."
      />

      <div className={styles.sections}>
        {/* Company Information Section */}
        <div className={styles.section}>
          <SectionTitle
            title="معلومات الشركة"
            icon="/svg/auth/building.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <InputGroup
              label="اسم الجهة/المنشأة الرسمية"
              type="text"
              placeholder="الاسم الرسمي للشركة"
              required
              name="companyName"
              value={whiteLabelData.paymentData.companyName.value}
              onChange={(e) =>
                handleInputChange("paymentData", "companyName", e.target.value)
              }
              error={whiteLabelData.paymentData.companyName.error}
              iconPath="auth/building.svg"
            />

            <InputGroup
              label="السجل التجاري أو رقم الترخيص"
              type="text"
              placeholder="رقم السجل التجارى"
              required
              name="licenseNumber"
              value={whiteLabelData.paymentData.licenseNumber.value}
              onChange={(e) =>
                handleInputChange(
                  "paymentData",
                  "licenseNumber",
                  e.target.value
                )
              }
              error={whiteLabelData.paymentData.licenseNumber.error}
              iconPath="auth/document.svg"
            />
            <InputGroup
              label="الرقم الضريبى (optional)"
              type="text"
              placeholder="ادخل الرقم الضريبى"
              required
              name="TaxNumber"
              value={whiteLabelData.paymentData.TaxNumber.value}
              onChange={(e) =>
                handleInputChange("paymentData", "TaxNumber", e.target.value)
              }
              error={whiteLabelData.paymentData.TaxNumber.error}
              iconPath="auth/document.svg"
            />
          </div>
        </div>

        {/* National Address Section */}
        <div className={styles.section}>
          <SectionTitle
            title="العنوان الوطني"
            icon="/svg/auth/location.svg"
            height={24}
            width={24}
          />

          <div className={styles.inputs}>
            <div className={styles.row}>
              <InputGroup
                label="المدينة"
                type="text"
                placeholder="ادخل اسم المدينة"
                required
                name="city"
                value={whiteLabelData.paymentData.city.value}
                onChange={(e) =>
                  handleInputChange("paymentData", "city", e.target.value)
                }
                error={whiteLabelData.paymentData.city.error}
                iconPath="auth/location.svg"
              />
              <InputGroup
                label="الحي"
                type="text"
                placeholder="ادخل اسم الحي"
                required
                name="neighborhood"
                value={whiteLabelData.paymentData.neighborhood.value}
                onChange={(e) =>
                  handleInputChange(
                    "paymentData",
                    "neighborhood",
                    e.target.value
                  )
                }
                error={whiteLabelData.paymentData.neighborhood.error}
                iconPath="auth/location.svg"
              />
            </div>

            <InputGroup
              label="الشارع"
              type="text"
              placeholder="ادخل اسم الشارع"
              required
              name="street"
              value={whiteLabelData.paymentData.street.value}
              onChange={(e) =>
                handleInputChange("paymentData", "street", e.target.value)
              }
              error={whiteLabelData.paymentData.street.error}
              iconPath="auth/location.svg"
            />

            <div className={styles.row}>
              <InputGroup
                label="رقم المبنى"
                type="text"
                placeholder="ادخل رقم المبنى"
                required
                name="buildingNumber"
                value={whiteLabelData.paymentData.buildingNumber.value}
                onChange={(e) =>
                  handleInputChange(
                    "paymentData",
                    "buildingNumber",
                    e.target.value
                  )
                }
                error={whiteLabelData.paymentData.buildingNumber.error}
                iconPath="auth/location.svg"
              />
              <InputGroup
                label="الرقم الإضافي"
                type="text"
                placeholder="ادخل الرقم الإضافي"
                name="additionalNumber"
                value={whiteLabelData.paymentData.additionalNumber.value}
                onChange={(e) =>
                  handleInputChange(
                    "paymentData",
                    "additionalNumber",
                    e.target.value
                  )
                }
                error={whiteLabelData.paymentData.additionalNumber.error}
                iconPath="auth/location.svg"
              />
            </div>

            <div className={styles.row}>
              <InputGroup
                label="نوع الوحدة (اختيارى)"
                type="text"
                placeholder="ادخل نوع الوحدة"
                name="placeType"
                value={whiteLabelData.paymentData.placeType.value}
                onChange={(e) =>
                  handleInputChange("paymentData", "placeType", e.target.value)
                }
                error={whiteLabelData.paymentData.placeType.error}
                iconPath="auth/location.svg"
              />
              <InputGroup
                label="رقم الوحدة (اختيارى)"
                type="text"
                placeholder="ادخل رقم الوحدة"
                name="placeNumber"
                value={whiteLabelData.paymentData.placeNumber.value}
                onChange={(e) =>
                  handleInputChange(
                    "paymentData",
                    "placeNumber",
                    e.target.value
                  )
                }
                error={whiteLabelData.paymentData.placeNumber.error}
                iconPath="auth/location.svg"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className={styles.section}>
          <SectionTitle
            title="طرق الدفع"
            icon="/svg/auth/payment.svg"
            height={24}
            width={24}
          />

          <div className={styles.options}>
            <CheckBoxItems
              items={["فاتورة", "مدى", "تحويل بنكى"]}
              checkedItems={whiteLabelData.paymentData.paymentMethod.value}
              onChange={handleCheckboxChange}
              columns={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
