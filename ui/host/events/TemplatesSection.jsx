"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardLayout from "../../commen/card/CardLayout";
import styles from "./templatesSection.module.css";
import Tabs from "../../commen/tabs/Tabs";

const dummyTemplates = [
  { labelKey: "templates.wedding", fallback: "حفلات زفاف" },
  { labelKey: "templates.graduation", fallback: "حفلات تخرج" },
  { labelKey: "templates.birthday", fallback: "حفلات عيد ميلاد" },
];

function TemplatesSection() {
  const { t } = useTranslation("home-events");
  const dummyTabs = [
    {
      key: "wedding",
      label: t("templates.wedding", "حفلات زفاف"),
    },
    {
      key: "graduation",
      label: t("templates.graduation", "حفلات تخرج"),
    },
    {
      key: "birthday",
      label: t("templates.birthday", "حفلات عيد ميلاد"),
    },
  ];
  const [activeTab, setActiveTab] = useState(dummyTabs[0].key);
  return (
    <CardLayout className={styles.card}>
      <h3 className={styles.title}>
        {t("templates.title", "قوالب المناسبات")}
      </h3>
      <p className={styles.description}>
        {t("templates.description", "اختر قالب مناسب لمناسبتك")}
      </p>
      <Tabs tabs={dummyTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.templatesContent}>
        {dummyTemplates.map((tpl, idx) => (
          <button
            key={idx}
            style={{
              background: "#fff7ec",
              color: "#b88c4a",
              border: "1px solid #e6b17a",
              borderRadius: "6px",
              padding: "0.7rem 1.8rem",
              fontSize: "1.1rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {t(tpl.labelKey, tpl.fallback)}
          </button>
        ))}
      </div>
    </CardLayout>
  );
}

export default TemplatesSection;
