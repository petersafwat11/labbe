import InputGroup from "@/ui/commen/inputs/inputGroup/InputGroup";
import Image from "next/image";
import React from "react";
import styles from "./continueFillingData.module.css";
import ConfirmBtn from "@/ui/commen/confirmButton/ConfirmBtn";
import { StepTitle } from "../whiteLabel/title/SectionTitle";
import SectionTitle from "../whiteLabel/title/SectionTitle";
const ContinueFillingData = ({ data, setData, showFormsForSignup }) => {
  return (
    <div className={styles.form_container}>
      <StepTitle
        title="أكمل ملفك الشخصى"
        description="أكمل ملفك الشخصى للاستفادة من خدماتنا"
      />    
      <div className={styles.form}>
        <div className={styles.section}>
          <SectionTitle title="المعلومات شخصية" />

          <InputGroup
            label="اسمك بالكامل"
            type="text"
            placeholder="ادخل الاسم"
            required
            name="name"
            value={data.name.value}
            onChange={(e) =>
              setData({ ...data, name: { value: e.target.value } })
            }
            error={data.name.error}
            iconPath="auth/profile.svg"
          />
        </div>
        <div className={styles.services}>
          <SectionTitle title="أختر الخدمة المقدمة" />
          <p className={styles.services_description}>
            ما نوع الحدث الذي تريد تنظيمه؟{" "}
          </p>
          <div className={styles.services_list}>
            <Service
              title="دعوتك عبر منصتك"
              description="حل احترافي للجهات: لوحة تحكم مخصصة ومزايا متعددة."
              iconPath="svg/auth/plateform.svg"
              clickHandler={() =>
                setData({ ...data, service: { value: "دعوتك عبر منصتك" } })
              }
              selectedService={data.service.value}
            />
            <Service
              title="دعوتك علينا"
              description="فريق لبّى يتولى كل شيء من تصميم وإرسال ومتابعة الحضور وتذكير الضيوف."
              iconPath="svg/auth/invite.svg"
              clickHandler={() =>
                setData({ ...data, service: { value: "دعوتك علينا" } })
              }
              selectedService={data.service.value}
            />
            <Service
              title="دعوتك بيدك"
              description="صمم وارسل دعوتك بسهولة عبر الواتساب مع كود QR خاص لكل ضيف!"
              iconPath="svg/auth/qrcode.svg"
              clickHandler={() =>
                setData({ ...data, service: { value: "دعوتك بيدك"} })
              }
              selectedService={data.service.value}
            />
          </div>
        </div>
        <ConfirmBtn
          clickHandler={showFormsForSignup}
          text="تأكيد"
          active={data.name.value && data.service.value}
        />
      </div>
    </div>
  );
};

export default ContinueFillingData;
export const Service = ({
  title,
  description,
  iconPath,
  clickHandler,
  selectedService,
}) => {
  return (
    <div
      onClick={clickHandler}
      className={`${styles.service} ${
        selectedService === title ? styles.selected_service : ""
      }`}
    >
      <div className={styles.service_icon}>
        <Image
          src={iconPath}
          alt={title || "service icon"}
          width={32}
          height={32}
        />
      </div>
      <div className={styles.service_text}>
        <h4 className={styles.service_title}>{title}</h4>
        <p className={styles.service_description}>{description}</p>
      </div>
    </div>
  );
};
