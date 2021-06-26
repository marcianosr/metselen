import React, { MouseEvent } from "react";
import { BrickType } from "../../../types/Bricks";
import styles from "./styles.module.css";

type InventoryBrickProps = {
	onMouseEnter: (e: MouseEvent) => void;
	onMouseLeave: (e: MouseEvent) => void;
	onClick: () => void;

};

const InventoryBrick: React.FC<InventoryBrickProps> = ({
	onMouseEnter,
	onMouseLeave,
	onClick,
	children,
}) => (
	<div
		className={styles.inventoryBrick}
		onClick={onClick}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
	>
		{children}
	</div>
);


export default InventoryBrick;
