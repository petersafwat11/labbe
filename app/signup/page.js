import React from "react";
import styles from "./page.module.css";
import WhiteLabelForm from "@/ui/signup/whiteLabel/WhiteLabelForm";
const page = () => {
  return (
    <div className={styles.page}>
      <WhiteLabelForm />
    </div>
  );
};

export default page;
