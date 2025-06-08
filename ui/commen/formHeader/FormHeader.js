import React, { useState } from "react";
import styles from "./formHeader.module.css";
const FormHeader = () => {
  const [language, setLanguage] = useState("arabic");
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <h1 className={styles.title}>
          <p className={styles.logo}>
            <span className={styles.logo_text}>L</span>
          </p>
          <span className={styles.arabic_title}> لبّى </span> Labbe
        </h1>
      </div>
      <div className={styles.languages}>
        <p
          className={language === "arabic" ? styles.active : styles.arabic}
          onClick={() => setLanguage("arabic")}
        >
          العربية
        </p>
        <p
          className={language === "english" ? styles.active : styles.english}
          onClick={() => setLanguage("english")}
        >
          {" "}
          English
        </p>
      </div>
    </div>
  );
};

export default FormHeader;
