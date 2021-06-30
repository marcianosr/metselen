import React from "react";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";
import BrickWall from "../Grid";
import InputGroup from "../InputGroup";
import Inventory from "../Inventory";
import LevelInfoGroup from "../LevelInfoGroup";

const Editor = () => {
	const {
		levelConfigState,
		updateLevelConfigState,
	} = useLevelConfigState();

	return (
		<>
			<LevelInfoGroup />
			<BrickWall />
			{/* <Inventory direction="horizontal">
				<BrickInventory />
			</Inventory> */}
			<Inventory>
				<InputGroup
					label="Level name"
					value={levelConfigState.name}
					type="text"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						updateLevelConfigState("name", e.target.value)
					}
				/>
				<InputGroup
					label="Time"
					value={levelConfigState.time}
					type="number"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						updateLevelConfigState("time", parseInt(e.target.value))
					}
				/>
			</Inventory>
		</>
	);
};

export default Editor;
