import React from "react";
import styles from "./styles.module.css";
import { BrickType, pinkSchemeColors } from "../../../types/Bricks";
import Brick from "../../../components/Brick";
import classNames from "classnames";

const brickTypes: BrickType[] = [
	{
		id: 1,
		size: "verySmall",
		color: {
			key: "1",
			values: [...pinkSchemeColors.normal],
		},
	},
	{
		id: 2,
		size: "small",
		color: {
			key: "1",
			values: [...pinkSchemeColors.normal],
		},
	},
	{
		id: 3,
		size: "medium",
		color: {
			key: "1",
			values: [...pinkSchemeColors.normal],
		},
	},
	{
		id: 4,
		size: "large",
		color: {
			key: "1",
			values: [...pinkSchemeColors.normal],
		},
	},
	{
		id: 5,
		size: "veryLarge",
		color: {
			key: "1",
			values: [...pinkSchemeColors.normal],
		},
	},
];

type InventoryProps = { direction?: string };

const Inventory: React.FC<InventoryProps> = ({
	direction = "vertical",
	children,
}) => (
	<aside className={classNames(styles.inventory, [styles[direction]])}>
		{children}
		{/* <h1>Brick types</h1>
		<ul className={styles.bricksContainer}>
			{brickTypes.map((brick: BrickType) => (
				<li>
					<Brick
						id={brick.id}
						color={brick?.color}
						size={brick.size}
						text={""}
					/>
					<span>{brick.size}</span>
				</li>
			))}
		</ul> */}
	</aside>
);

export default Inventory;
