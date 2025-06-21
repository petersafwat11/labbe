import React from "react";
import styles from "./stepOne.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import MobileInputGroup from "@/ui/commen/inputs/mobileInputGroup/MobileInputGroup";
import CheckBoxItems from "@/ui/commen/checkboxItems/CheckBoxItems";
import { StepTitle } from "../../../commen/title/SectionTitle";
import SectionTitle from "../../../commen/title/SectionTitle";

const StepOne = ({ vendorData, setVendorData }) => {
  const handleInputChange = (section, field, value) => {
    setVendorData({
      ...vendorData,
      [section]: {
        ...vendorData[section],
        [field]: { value, error: "" },
      },
    });
  };

  const handleCheckboxChange = (item, checked) => {
    const currentValues = vendorData.identity.serviceType.value;
    let newValues;

    if (checked) {
      // Add item if checked
      newValues = [...currentValues, item];
    } else {
      // Remove item if unchecked
      newValues = currentValues.filter((value) => value !== item);
    }

    setVendorData({
      ...vendorData,
      identity: {
        ...vendorData.identity,
        serviceType: { value: newValues, error: "" },
      },
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title="معلومات الحساب الأساسية"
        description="أدخل بياناتك الشخصية والتجارية لبدء إنشاء حسابك كمزود خدمة."
      />
      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title="معلومات النشاط"
            icon="/svg/auth/info-circle.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <InputGroup
              label="اسم العلامة التجارية"
              type="text"
              placeholder="أدخل اسم العلامة التجارية"
              name="brandName"
              value={vendorData.identity.brandName.value}
              onChange={(e) =>
                handleInputChange("identity", "brandName", e.target.value)
              }
              error={vendorData.identity.brandName.error}
              iconPath="auth/profile-circle.svg"
            />
            <InputGroup
              label="الاسم الكامل لصاحب الحساب"
              type="text"
              placeholder="أدخل الاسم الكامل"
              name="ownerFullName"
              value={vendorData.identity.ownerFullName.value}
              onChange={(e) =>
                handleInputChange("identity", "ownerFullName", e.target.value)
              }
              error={vendorData.identity.ownerFullName.error}
              iconPath="auth/profile-circle.svg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title="نوع الخدمة"
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "تنظيم الفعاليات",
                "الإنتاج الإعلامي",
                "الهدايا والحقائب الدعائية",
                "الطعام والمشروبات",
                "الجمال والأزياء",
                "اللوجستيات والتوصيل",
                "الخدمات المؤسسية",
                "أخرى",
              ]}
              checkedItems={vendorData.identity.serviceType.value}
              onChange={handleCheckboxChange}
              columns={2}
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title="معلومات التواصل"
            icon="/svg/auth/call-calling.svg"
            height={24}
            width={24}
          />
          <div className={styles.inputs}>
            <MobileInputGroup
              label="رقم الجوال"
              type="tel"
              placeholder="أدخل رقم الجوال"
              name="phoneNumber"
              value={vendorData.identity.phoneNumber.value}
              onChange={(e) =>
                handleInputChange("identity", "phoneNumber", e.target.value)
              }
              error={vendorData.identity.phoneNumber.error}
            />
            <InputGroup
              label="البريد الإلكتروني"
              type="email"
              placeholder="أدخل البريد الإلكتروني"
              name="email"
              value={vendorData.identity.email.value}
              onChange={(e) =>
                handleInputChange("identity", "email", e.target.value)
              }
              error={vendorData.identity.email.error}
              iconPath="auth/email.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
