import React from "react";
import styles from "./page.module.css";
import VendorSignup from "@/ui/signup/vendor/VendorSignup";
const page = () => {
  return (
    <div className={styles.page}>
      <VendorSignup />
    </div>
  );
};

export default page;
