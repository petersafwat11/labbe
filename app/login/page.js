import React from "react";
import styles from "./page.module.css";
import ImageCarousel from "@/ui/login/imageCarousel/ImageCarousel";
import Form from "@/ui/login/form/Form";
const page = () => {
  return (
    <div className={"page"}>
      <div className={styles.container}>
        <div className={styles.left}>
          <ImageCarousel />
        </div>
        <div className={styles.right}>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default page;
