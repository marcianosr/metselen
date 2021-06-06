import React from "react";
import styles from "./styles.module.css";

const TextCollectionWrapper: React.FC = ({ children }) => (
	<section className={styles.textCollectionWrapper}>
		<section className={styles.container}>{children}</section>
	</section>
);

export default TextCollectionWrapper;
