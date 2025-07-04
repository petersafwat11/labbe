import React from "react";
import styles from "./page.module.css";
import Tabs from "./_components/tabs/Tabs";
// import { useTranslation } from "react-i18next";
import AccountSettings from "./_components/accountSettings/AccountSettings";
import Notifictions from "./_components/notifictions/Notifictions";
import Permissions from "./_components/permetions/permetions";
import { cookies } from "next/headers";
import { notificationAPI } from "@/lib/host";

const page = async ({ searchParams, params }) => {
  const { type } = await searchParams;
  // const { t } = useTranslation("settings");

  const cookieStore = await cookies();

  let user = null;
  let notifications = null;

  try {
    const userCookie = cookieStore.get("user")?.value;
    const token = cookieStore.get("token")?.value;
    console.log("token", cookieStore);
    if (userCookie) {
      user = JSON.parse(userCookie);
    }

    // Fetch notifications only if token exists
    if (token) {
      try {
        const response = await notificationAPI.getNotificationPreferences(
          token
        );
        console.log("Server-side notification response:", response);

        if (response.status === "success") {
          notifications = response.data.notifications;
        }
      } catch (error) {
        console.error("Error fetching notifications on server:", error);
        // Don't throw error, just set notifications to null
        notifications = null;
      }
    }
  } catch (error) {
    console.error("Error parsing cookies:", error);
    user = null;
    notifications = null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {/* {t("page_title")} */}
          الاعدادات
        </h1>
      </div>
      <Tabs />
      {type === undefined ||
        (type === "account" && (
          <AccountSettings
            user={{
              emailVerified: user?.emailVerified || false,
              email: user?.email || "",
              username: user?.username || "",
            }}
          />
        ))}
      {type === "notifications" && <Notifictions initialData={notifications} />}
      {type === "permissions" && <Permissions />}
    </div>
  );
};

export default page;
