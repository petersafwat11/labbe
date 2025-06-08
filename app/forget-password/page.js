import React from "react";
import styles from "./page.module.css";
import ImageCarousel from "@/ui/commen/imageCarousel/ImageCarousel";
import ForgetPassword from "@/ui/forget-password/ForgetPassword";
const page = () => {
  return (
    <div className={"page"}>
      <div className={styles.container}>
        <div className={styles.right}>
          <ForgetPassword />
        </div>
        <div className={styles.left}>
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
};

export default page;
