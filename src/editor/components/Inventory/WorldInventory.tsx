import React from "react";
import { LevelDraftStateProps } from "../../../types/LevelState";
import InputGroup from "../InputGroup";

const WorldInventory: React.FC<LevelDraftStateProps> = ({
	levelDraftState,
	setLevelDraftState,
}) => (
	<section>
		<InputGroup
			label="World name"
			value={levelDraftState.name}
			type="text"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setLevelDraftState({
					...levelDraftState,
					name: e.target.value,
				})
			}
		/>
		<InputGroup
			label="Is world unlocked"
			value={"isUnlocked"}
			type="checkbox"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setLevelDraftState({
					...levelDraftState,
					isUnlocked: false,
				})
			}
		/>
		<InputGroup
			label="Bricks needed to unlock"
			value={levelDraftState.bricksNeeded}
			type="number"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setLevelDraftState({
					...levelDraftState,
					bricksNeeded: parseInt(e.target.value),
				})
			}
		/>
		<InputGroup
			label="World"
			value={levelDraftState.worldNumber}
			type="number"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setLevelDraftState({
					...levelDraftState,
					worldNumber: parseInt(e.target.value),
				})
			}
		/>
	</section>
);

export default WorldInventory;
