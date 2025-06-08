import React from "react";
import styles from "./stepThree.module.css";
import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";
import CheckBoxItems from "@/ui/commen/checkboxItems/CheckBoxItems";

const StepThree = ({ whiteLabelData, setWhiteLabelData }) => {
  const handleInputChange = (section, field, value) => {
    setWhiteLabelData({
      ...whiteLabelData,
      [section]: {
        ...whiteLabelData[section],
        [field]: { value, error: "" },
      },
    });
  };

  const handleCheckboxChange = (section, field, item, checked) => {
    const currentValues = whiteLabelData[section][field].value;
    let newValues;

    if (checked) {
      // Add item if checked
      newValues = [...currentValues, item];
    } else {
      // Remove item if unchecked
      newValues = currentValues.filter((value) => value !== item);
    }

    setWhiteLabelData({
      ...whiteLabelData,
      [section]: {
        ...whiteLabelData[section],
        [field]: { value: newValues, error: "" },
      },
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title="متطلبات النظام"
        description="شارك تفاصيل الاستخدام لمساعدتنا في تهيئة المنصة بما يناسب احتياجاتك."
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title="الاستخدام المتوقع"
            icon="/svg/auth/usage.svg"
            height={24}
            width={24}
          />

          <div className={styles.row}>
            <InputGroup
              label="عدد الفعاليات المتوقعة"
              type="number"
              placeholder="ادخل عدد الفعاليات "
              required
              name="numberOfEvents"
              value={whiteLabelData.systemRequirements.numberOfEvents.value}
              onChange={(e) =>
                handleInputChange(
                  "systemRequirements",
                  "numberOfEvents",
                  e.target.value
                )
              }
              error={whiteLabelData.systemRequirements.numberOfEvents.error}
              iconPath="auth/calendar.svg"
            />
            <InputGroup
              label="عدد الضيوف المتوقعة لكل فعالية"
              type="number"
              placeholder="ادخل عدد الضيوف "
              required
              name="numberOfGuestsPerEvent"
              value={
                whiteLabelData.systemRequirements.numberOfGuestsPerEvent.value
              }
              onChange={(e) =>
                handleInputChange(
                  "systemRequirements",
                  "numberOfGuestsPerEvent",
                  e.target.value
                )
              }
              error={
                whiteLabelData.systemRequirements.numberOfGuestsPerEvent.error
              }
              iconPath="auth/people.svg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title="نوع الفعاليات"
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />

          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "ورش عمل",
                "مؤتمرات",
                "مناسبات واحتفالات",
                "اجتماعات",
                "دورات تدريبية",
                "معارض",
              ]}
              checkedItems={whiteLabelData.systemRequirements.eventsTypes.value}
              onChange={(item, checked) =>
                handleCheckboxChange(
                  "systemRequirements",
                  "eventsTypes",
                  item,
                  checked
                )
              }
            />
          </div>
        </div>

        <div className={styles.section}>
          <SectionTitle
            title="التكامل مع الأنظمة الداخلية"
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />

          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "نظام إدارة العملاء (CRM)",
                "بوابة الرسائل النصية (SMS)",
                "البريد الإلكتروني",
                "التقويم (Google/Outlook)",
                "بوابات الدفع",
                "أدوات التحليل",
              ]}
              checkedItems={whiteLabelData.systemRequirements.services.value}
              onChange={(item, checked) =>
                handleCheckboxChange(
                  "systemRequirements",
                  "services",
                  item,
                  checked
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
