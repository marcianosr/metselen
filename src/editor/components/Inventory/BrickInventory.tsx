import React, { MouseEvent, useState } from "react";
import { BrickType, pinkSchemeColors } from "../../../types/Bricks";
import Brick from "../../../components/Brick";
import InventoryBrick from "../Brick";

import styles from "./styles.module.css";
import { useLevelState } from "../../../providers/LevelStateProvider";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";

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

type BrickInventoryProps = {

};

const BrickInventory: React.FC<BrickInventoryProps> = () => {
	const { levelConfigState, updateLevelConfigStateMultiple } =
		useLevelConfigState();

	return (
		<section>
			<h1>Brick types</h1>
			{/* <ul className={styles.brickInventoryContainer}>
				{brickTypes.map((brick: BrickType) => (
					<li>
						<InventoryBrick
							onClick={() => {
								addBrick(brick, 0);
							}}
							onMouseEnter={() => showPotentialPlacementOfBrick(brick)}
							onMouseLeave={removeLastBrick}
						>
							<Brick
								id={brick.id}
								color={brick?.color}
								size={brick.size}
								text={brick.size}
								onClick={onClick}
							/>
							<span>{brick.size}</span>
						</InventoryBrick>
					</li>
				))}
			</ul> */}
		</section>
	);
};

export default BrickInventory;
