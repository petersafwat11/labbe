import React from "react";
import styles from "./stepFour.module.css";
import { StepTitle } from "../title/SectionTitle";
import SectionTitle from "../title/SectionTitle";
import CheckBoxItems from "@/ui/commen/checkboxItems/CheckBoxItems";

const StepFour = ({ whiteLabelData, setWhiteLabelData }) => {
  const handleCheckboxChange = (item, checked) => {
    const currentValues = whiteLabelData.additionalServices;
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
      additionalServices: newValues,
    });
  };

  return (
    <div className={styles.container}>
      <StepTitle
        title="خدمات إضافية"
        description="اختر ما يناسبك من الإعدادات والخيارات التكميلية."
      />

      <div className={styles.sections}>
        <div className={styles.section}>
          <SectionTitle
            title="نوع الفاعليات"
            icon="/svg/auth/calendar.svg"
            height={24}
            width={24}
          />
          <div className={styles.options}>
            <CheckBoxItems
              items={[
                "تفعيل صفحة تهنئة/تعليقات بعد الفعالية",
                "تمكين التحميل التلقائي لصور الضيوف",
                "دعم النشرات البريدية أو الحملات الترويجية",
                "دعم النشرات البريدية أو الحملات الترويجية",
              ]}
              checkedItems={whiteLabelData.additionalServices}
              onChange={handleCheckboxChange}
              columns={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
