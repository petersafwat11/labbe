import React from "react";
import Sidebar from "@/ui/host/event/Sidebar/Sidebar";
import Header from "@/ui/host/event/Header/Header";
import styles from "./layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      <div className={styles.contentWithHeader}>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
