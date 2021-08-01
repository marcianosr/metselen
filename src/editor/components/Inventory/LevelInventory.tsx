import React from "react";
import { LevelDraftStateProps } from "../../../types/LevelState";
import InputGroup from "../InputGroup";
import styles from "./styles.module.css";

const LevelInventory: React.FC<LevelDraftStateProps> = ({
	levelDraftState,
	setLevelDraftState,
}) => (
	<section>
		<InputGroup
			label="Level name"
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
			label="Time"
			value={levelDraftState.time}
			type="number"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setLevelDraftState({
					...levelDraftState,
					time: parseInt(e.target.value),
				})
			}
		/>
		<InputGroup
			label="Is level unlocked"
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

		<div className={styles.inputGroup}>
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
			<InputGroup
				label="Level"
				value={levelDraftState.levelNumber}
				type="number"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setLevelDraftState({
						...levelDraftState,
						levelNumber: parseInt(e.target.value),
					})
				}
			/>
		</div>
	</section>
);

export default LevelInventory;
