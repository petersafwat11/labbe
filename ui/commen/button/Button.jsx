import React from "react";
import styles from "./button.module.css";

const Button = ({
  variant = "primary",
  icon,
  title,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  style,
}) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {icon && <img src={icon} alt="" />}
      {title && `${title}`}
    </button>
  );
};

export default Button;
