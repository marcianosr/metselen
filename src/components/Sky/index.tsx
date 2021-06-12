import React from "react";
import styles from "./styles.module.css";

const Sky: React.FC = ({ children }) => {
	return <div className={styles.base}>{children}</div>;
};

export default Sky;
