import React from "react";
import axios from "axios";
import { useLevelConfigState, LevelConfigState } from "../../../providers/LevelConfigProvider";
import Grid from "../Grid";
import InputGroup from "../InputGroup";
import Inventory from "../Inventory";
import LevelInfoGroup from "../LevelInfoGroup";

type LevelDraftState = LevelConfigState;

const Editor = () => {
	const {
		levelConfigState,
		updateLevelConfigStateMultiple
	} = useLevelConfigState();

	const [levelDraft, setLevelDraft] = React.useState<LevelDraftState>(
		levelConfigState
	);


	const saveLevel = () => {
		updateLevelConfigStateMultiple({
			...levelConfigState,
			...levelDraft
		});

		axios.post("/api", { level: levelDraft, }).then(response => console.log(response))
	}

	return (
		<>
			<LevelInfoGroup />
			<Grid levelDraft={levelDraft} setLevelDraft={setLevelDraft} />
			{/* <Inventory direction="horizontal">
				<BrickInventory />
			</Inventory> */}
			<Inventory>
				<InputGroup
					label="Level name"
					value={levelDraft.name}
					type="text"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLevelDraft({
							...levelDraft,
							name: e.target.value
						})
					}
				/>
				<InputGroup
					label="Time"
					value={levelDraft.time}
					type="number"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLevelDraft({
							...levelDraft,
							time: parseInt(e.target.value)
						})
					}
				/>
				<button onClick={saveLevel}>Save level</button>

			</Inventory>
		</>
	);
};

export default Editor;
