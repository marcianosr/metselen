import React from "react";
import { BrickType, pinkSchemeColors } from "../../../types/Bricks";
import Brick from "../../../components/Brick";
import styles from "./styles.module.css";

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

const BrickInventory = () => (
	<section>
		<h1>Brick types</h1>
		<ul className={styles.brickInventoryContainer}>
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
		</ul>
	</section>
);

export default BrickInventory;
