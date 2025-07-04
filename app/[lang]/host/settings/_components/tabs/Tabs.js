"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./tabs.module.css";

const Tabs = () => {
  const { t } = useTranslation("settings");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current tab from URL params, default to 'account'
  const currentTab = searchParams.get("type") || "account";

  // Define tabs with their keys and translation keys
  const tabs = [
    { key: "account", labelKey: "account_settings" },
    { key: "notifications", labelKey: "notifications" },
    { key: "permissions", labelKey: "permissions" },
  ];

  // Handle tab click - update URL parameters
  const handleTabClick = (tabKey) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", tabKey);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={currentTab === tab.key ? styles.active_tab : styles.tab}
          onClick={() => handleTabClick(tab.key)}
        >
          {t(tab.labelKey)}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
