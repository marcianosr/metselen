import React from "react";
import { useLevelConfigState } from "../../../providers/LevelConfigProvider";
import BrickWall from "../BrickWall";
import InputGroup from "../InputGroup";
import Inventory from "../Inventory";

const Editor = () => {
	const { levelConfigState, updateLeveConfigState } = useLevelConfigState();
	return (
		<>
			<BrickWall />
			<Inventory direction="horizontal">hi</Inventory>
			<Inventory>
				<InputGroup
					label="Amount of columns"
					value={levelConfigState.columns}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						updateLeveConfigState(
							"columns",
							parseInt(e.target.value)
						)
					}
				/>
				<InputGroup
					label="Time"
					value={levelConfigState.time}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						updateLeveConfigState("time", parseInt(e.target.value))
					}
				/>
			</Inventory>
		</>
	);
};

export default Editor;
