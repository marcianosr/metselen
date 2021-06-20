import React from "react";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";
import BrickWall from "../BrickWall";
import InputGroup from "../InputGroup";
import Inventory from "../Inventory";
import BrickInventory from "../Inventory/BrickInventory";

const Editor = () => {
	const { levelConfigState, updateLevelConfigState } = useLevelConfigState();
	return (
		<>
			<BrickWall />
			<Inventory direction="horizontal">
				<BrickInventory />
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
