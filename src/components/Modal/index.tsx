import React from "react";
import styles from "./styles.module.css";

const Modal: React.FC = ({ children }) => (
	<div className={styles.modal}>{children}</div>
);

export default Modal;
