import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

type InventoryProps = { direction?: string };

const Inventory: React.FC<InventoryProps> = ({
	direction = "vertical",
	children,
}) => (
	<aside className={classNames(styles.inventory, [styles[direction]])}>
		{children}
	</aside>
);

export default Inventory;
