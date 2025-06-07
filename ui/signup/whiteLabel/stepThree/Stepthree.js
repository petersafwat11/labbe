import React, { useState } from "react";
import styles from "./stepThree.module.css";
import Image from "next/image";
import InputGroup from "@/ui/commen/inputGroup/InputGroup";
const StepThree = () => {
  const [whiteLabelData, setWhiteLabelData] = useState({
    systemRequirements: {
      numberOfEvents: { value: "", error: "" },
      numberOfGuestsPerEvent: { value: "", error: "" },
      eventsTypes: { value: [], error: "" },
      services: { value: [], error: "" },
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h3 className={styles.section_title}>
            {" "}
            <Image
              src="/svg/auth/usage-info.svg"
              alt="usage info"
              width={24}
              height={24}
            />{" "}
            الاستخدام المتوقع{" "}
          </h3>
          <div className={styles.row}>
            <InputGroup
              label="عدد الفعاليات المتوقعة"
              type="text"
              placeholder="ادخل عدد الفعاليات المتوقعة"
              required
              placement="left"
              name="numberOfEvents"
              value={whiteLabelData.systemRequirements.numberOfEvents.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  systemRequirements: {
                    ...whiteLabelData.systemRequirements,
                    numberOfEvents: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.systemRequirements.numberOfEvents.error}
              iconPath="auth/number-of-events.svg"
            />
            <InputGroup
              label="عدد الضيوف المتوقعة لكل فعالية"
              type="text"
              placeholder="ادخل عدد الضيوف المتوقعة لكل فعالية"
              required
              placement="left"
              name="numberOfGuestsPerEvent"
              value={whiteLabelData.systemRequirements.numberOfGuestsPerEvent.value}
              onChange={(e) =>
                setWhiteLabelData({
                  ...whiteLabelData,
                  systemRequirements: {
                    ...whiteLabelData.systemRequirements,
                    numberOfGuestsPerEvent: { value: e.target.value, error: "" },
                  },
                })
              }
              error={whiteLabelData.systemRequirements.numberOfGuestsPerEvent.error}
              iconPath="auth/number-of-guests.svg"
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
            نوع الفاعليات{" "}
          </h3>
          <div className={styles.options}>
            {[
              "ورش عمل",
              "مؤتمرات",
              " مناسبات واحتفالات",
              " اجتماعات",
              "دورات تدريبية",
              "معارض",
            ].map((item, index) => (
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
        <div className={styles.section}>
          <h3 className={styles.section_title}>
            {" "}
            <Image
              src="/svg/auth/personal-info.svg"
              alt="personal info"
              width={24}
              height={24}
            />{" "}
            التكامل مع الأنظمة الداخلية{" "}
          </h3>
          <div className={styles.options}>
            {[
              "نظام إدارة العملاء (CRM)",
              "بوابة الرسائل النصية (SMS)",
              " البريد الإلكتروني",
              " التقويم (Google/Outlook)",
              "بوابات الدفع",
              "أدوات التحليل",
            ].map((item, index) => (
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

export default StepThree;
