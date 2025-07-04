"use client";
import React from "react";
import styles from "./EventsToolbar.module.css";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import UseLanguageChange from "@/hooks/UseLanguageChange";

function EventsToolbar() {
  const { t } = useTranslation("home-events");
  const router = useRouter();
  const { currentLocale } = UseLanguageChange();
  return (
    <div className={styles.toolbar}>
      <div className={styles.welcome}>
        <div className={styles.welcomeTitle}>{t("toolbar.welcome")}</div>
        <div className={styles.welcomeSubtitle}>
          {t("toolbar.welcomeSubtitle")}
        </div>
      </div>

      <div className={styles.toolbarActions}>
        <button onClick={() => router.push(`/${currentLocale}/host/create-event`)} className={styles.createBtn}>{t("toolbar.createEvent")}</button>
      </div>
    </div>
  );
}

export default EventsToolbar;
