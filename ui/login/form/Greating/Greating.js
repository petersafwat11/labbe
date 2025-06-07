import React from "react";
import styles from "./greating.module.css";
const Greating = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>مرحبًا بك فى لبّى</h2>
      <p className={styles.login_text}>سجل دخولك وتمتع بمزايا لبى </p>
    </div>
  );
};

export default Greating;
