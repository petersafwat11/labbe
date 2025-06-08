import React from "react";
import styles from "./page.module.css";
import ChangePassword from "@/ui/change-password/ChangePassword";
import ImageCarousel from "@/ui/commen/imageCarousel/ImageCarousel";
const page = () => {
  return (
    <div className={"page"}>
      <div className={styles.container}>
        <div className={styles.right}>
          <ChangePassword />
        </div>
        <div className={styles.left}>
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
};

export default page;
