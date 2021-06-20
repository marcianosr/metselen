import React, { MouseEvent } from "react";
import styles from "./styles.module.css";

type InventoryBrickProps = {
	onMouseEnter: (e: MouseEvent) => void;
};

const InventoryBrick: React.FC<InventoryBrickProps> = ({
	onMouseEnter,
	children,
}) => (
	<div className={styles.inventoryBrick} onMouseEnter={onMouseEnter}>
		{children}
	</div>
);

export const TransparentBrick: React.FC = ({ children }) => (
	<div className={styles.transparentBrick}>{children}</div>
);

export default InventoryBrick;
