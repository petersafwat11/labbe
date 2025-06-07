"use client";
import React, { useState } from "react";
import Stepper from "./stepper/Stepper";
import styles from "./whiteLabelform.module.css";
import FormHeader from "@/ui/commen/formHeader/FormHeader";
import InputGroup from "@/ui/commen/inputGroup/InputGroup";
import Image from "next/image";
import ConfirmBtn from "@/ui/commen/confirmButton/ConfirmBtn";

const WhiteLabelForm = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  return (
    <div>
      <div className={styles.form_header}>
        <FormHeader />
      </div>
      <div className={styles.top_text}>
        <h2 className={styles.top_text_title}>أكمل ملفك الشخصى</h2>
        <p className={styles.top_text_description}>
          اتبع الخوات التالية لبتاء متجرك مع لبّى وبدء تفعيلها بالشكل الذي يناسب
          علامتك التجارية.{" "}
        </p>
      </div>
      {/* <div className={styles.form}>
        <h3 className={styles.form_title}>المعلومات شخصية</h3>
        <InputGroup
          label="البريد اللإلكترونى"
          type="email"
          placeholder="ادخل البريد اللإلكترونى"
          required
          placement="left"
          name="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          error={errors.email}
          iconPath="auth/email.svg"
        />
        <div className={styles.services}>
          <h3 className={styles.services_title}>أختر الخدمة المقدمة</h3>
          <p className={styles.services_description}>
            ما نوع الحدث الذي تريد تنظيمه؟{" "}
          </p>
          <div className={styles.services_list}>
            <Service
              title="دعوتك بيدك"
              description="صمم وارسل دعوتك بسهولة عبر الواتساب مع كود QR خاص لكل ضيف!"
              iconPath="svg/auth/qrcode.svg"
            />
            <Service
              title="دعوتك علينا"
              description="فريق لبّى يتولى كل شيء من تصميم وإرسال ومتابعة الحضور وتذكير الضيوف."
              iconPath="svg/auth/invite.svg"
            />
            <Service
              title="دعوتك عبر منصتك"
              description="حل احترافي للجهات والشركات: لوحة تحكم مخصصة، نظام متعدد المستخدمين، ومزايا لا محدودة"
              iconPath="svg/auth/plateform.svg"
            />
          </div>
        </div>
        <ConfirmBtn text="تأكيد" active={true} />
      </div> */}

      <Stepper />
    </div>
  );
};

export default WhiteLabelForm;

export const Service = ({ title, description, iconPath }) => {
  return (
    <div className={styles.service}>
      <div className={styles.service_icon}>
        <Image
          src={iconPath}
          alt={title || "service icon"}
          width={24}
          height={24}
        />
      </div>
      <div className={styles.service_text}>
        <h4 className={styles.service_title}>{title}</h4>
        <p className={styles.service_description}>{description}</p>
      </div>
    </div>
  );
};
