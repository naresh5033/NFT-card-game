import React from "react";

import { AlertIcon } from "../assets";
import styles from "../styles";

//type for info, alert, success, error
const Alert = ({ type, message }) => (
  <div className={`${styles.alertContainer} ${styles.flexCenter}`}>
    <div className={`${styles.alertWrapper} ${styles[type]}`} role="alert">
      <AlertIcon type={type} /> {message}
    </div>
  </div>
);

export default Alert;
