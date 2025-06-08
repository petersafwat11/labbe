import React from "react";
import styles from "./title.module.css";
import Image from "next/image";
const SectionTitle = ({ title, icon, height, width }) => {
  return (
    <h3 className={styles.section_title}>
      {icon && <Image src={icon} alt="logo" width={width} height={height} />}
      {title}
    </h3>
  );
};

export default SectionTitle;

export const StepTitle = ({ title, description }) => {
  return (
    <div className={styles.step_text}>
      <h3 className={styles.step_title}>{title}</h3>
      <p className={styles.step_description}>{description}</p>
    </div>
  );
};
