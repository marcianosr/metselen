import React from "react";
import styles from "./styles.module.css";

export const BrickRowContainer: React.FC = ({ children }) => (
	<div className={styles.brickRowContainer}>{children}</div>
);

type BrickRowProps = {
	idx: number;
};

export const BrickRow: React.FC<BrickRowProps> = ({ idx, children }) => (
	<div key={idx} className={styles.brickRow}>
		{children}
	</div>
);
