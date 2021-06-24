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
	onClick?: () => void;
	addBrick: (brick: BrickType, rowIdx: number) => void;
};

const BrickInventory: React.FC<BrickInventoryProps> = ({ onClick, addBrick }) => {
	const { levelConfigState, updateLevelConfigStateMultiple } =
		useLevelConfigState();


	const showPotentialPlacementOfBrick = (brick: BrickType) => {
		// Add to the bricks array to display this in the wall 
		// When selecting another brick remove the last added brick which is the preview brick
		// When pressing 'add', add the selected brick and also add a new preview brick that is currently active

		updateLevelConfigStateMultiple({
			layout: [
				{
					order: 1,
					bricks: [
						...levelConfigState.layout[0]
							.bricks,
						{
							id: 1,
							size: brick.size,
						},
					],
				},
			],
		});
	}

	const removeLastBrick = () => {
		updateLevelConfigStateMultiple({
			layout: [
				{
					order: 1,
					bricks: levelConfigState.layout[0].bricks.slice(0, levelConfigState.layout[0].bricks.length - 1)
				},
			],
		})
	}
	return (
		<section>
			<h1>Brick types</h1>
			<ul className={styles.brickInventoryContainer}>
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
			</ul>
		</section>
	);
};

export default BrickInventory;
