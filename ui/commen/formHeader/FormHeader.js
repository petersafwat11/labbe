import React, { useState } from "react";
import styles from "./formHeader.module.css";
const FormHeader = () => {
  const [language, setLanguage] = useState("english");
  return (
    <div className={styles.container}>
      <div className={styles.languages}>
        <p
          className={language === "english" ? styles.active : styles.english}
          onClick={() => setLanguage("english")}
        >
          English
        </p>
        <p
          className={language === "arabic" ? styles.active : styles.arabic}
          onClick={() => setLanguage("arabic")}
        >
          العربية
        </p>
      </div>
      <div className={styles.brand}>
        <h1 className={styles.title}>
          Labbe <span className={styles.arabic_title}> لبّى </span>
          <p className={styles.logo}>
            <span className={styles.logo_text}>L</span>
          </p>
        </h1>
      </div>
    </div>
  );
};

export default FormHeader;
