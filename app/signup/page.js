import React from "react";
import styles from "./page.module.css";
import SignupForm from "@/ui/signup/signupForm/SignupForm";
const page = () => {
  return (
    <div className={styles.page}>
      <SignupForm />
    </div>
  );
};

export default page;
