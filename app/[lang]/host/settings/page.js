import React from "react";
import styles from "./page.module.css";
import Tabs from "./_components/tabs/Tabs";
import AccountSettings from "./_components/accountSettings/AccountSettings";
import Notifictions from "./_components/notifictions/Notifictions";
import Permissions from "./_components/permetions/permetions";
const page = async ({ searchParams }) => {
  const { type } = await searchParams;
  console.log(type);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>الإعدادات</h1>
      </div>
      <Tabs />
      {type === "account" && <AccountSettings />}
      {type === "notifications" && <Notifictions />}
      {type === "permissions" && <Permissions />}
    </div>
  );
};

export default page;
