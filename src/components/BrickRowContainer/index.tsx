import React, { CSSProperties } from "react";
import styles from "./styles.module.css";

export const BrickRowContainer: React.FC = ({ children }) => (
	<div className={styles.brickRowContainer}>{children}</div>
);

export interface CSSVars extends CSSProperties {
	"--rowOrder": number;
}

type BrickRowProps = {
	idx: number;
	row?: number;
};

export const BrickRow: React.FC<BrickRowProps> = ({ idx, row, children }) => {
	const rowOrderStyles = {
		"--rowOrder": row,
	} as CSSVars;

	return (
		<div key={idx} style={rowOrderStyles} className={styles.brickRow}>
			{children}
		</div>
	);
};
