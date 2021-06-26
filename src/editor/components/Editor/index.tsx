import React, { useState } from "react";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";
import { BrickType } from "../../../types/Bricks";
import BrickWall from "../Grid";
import InputGroup from "../InputGroup";
import Inventory from "../Inventory";
import BrickInventory from "../Inventory/BrickInventory";

const Editor = () => {
	const {
		levelConfigState,
		updateLevelConfigState,
		updateLevelConfigStateMultiple,
	} = useLevelConfigState();


	return (
		<>
			<BrickWall />
			{/* <Inventory direction="horizontal">
				<BrickInventory />
			</Inventory> */}
			{/* <Inventory>
				<InputGroup
					label="Time"
					value={levelConfigState.time}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						updateLevelConfigState("time", parseInt(e.target.value))
					}
				/>
			</Inventory> */}
		</>
	);
};

export default Editor;
