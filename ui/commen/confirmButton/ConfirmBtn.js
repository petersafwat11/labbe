import React from "react";
import styles from "./confirmBtn.module.css";
const ConfirmBtn = ({ text, clickHandler, active }) => {
  return (
    <button
      onClick={clickHandler}
      className={active ? styles.confirm_btn : styles.confirm_btn_disabled}
    >
      {text}
    </button>
  );
};

export default ConfirmBtn;
