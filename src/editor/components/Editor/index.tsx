import React, { useState } from "react";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";
import { BrickType } from "../../../types/Bricks";
import BrickWall from "../BrickWall";
import InputGroup from "../InputGroup";
import Inventory from "../Inventory";
import BrickInventory from "../Inventory/BrickInventory";

const Editor = () => {
	const {
		levelConfigState,
		updateLevelConfigState,
		updateLevelConfigStateMultiple,
	} = useLevelConfigState();

	const addBrick = (brick: Pick<BrickType, "id" | "size">, row: number) => {
		updateLevelConfigStateMultiple({
			layout: [
				{
					order: 1,
					bricks: [
						...levelConfigState.layout[row].bricks,
						{
							id: brick.id,
							size: brick.size,
						},
					],
				},
			],
		});
	};

	return (
		<>
			<BrickWall />
			<Inventory direction="horizontal">
				<BrickInventory addBrick={addBrick} />
			</Inventory>
			<Inventory>
				<InputGroup
					label="Amount of columns"
					value={levelConfigState.columns}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						updateLevelConfigState(
							"columns",
							parseInt(e.target.value)
						)
					}
				/>
				<InputGroup
					label="Time"
					value={levelConfigState.time}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						updateLevelConfigState("time", parseInt(e.target.value))
					}
				/>
			</Inventory>
		</>
	);
};

export default Editor;
