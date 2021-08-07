import React from "react";
import { EditorDraftStateProps } from "../../../types/LevelState";
import InputGroup from "../InputGroup";
import styles from "./styles.module.css";

const LevelInventory: React.FC<EditorDraftStateProps> = ({
	editorDraftState,
	setEditorDraftState,
}) => (
	<section>
		<InputGroup
			label="Level name"
			value={editorDraftState.name}
			type="text"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setEditorDraftState({
					...editorDraftState,
					name: e.target.value,
				})
			}
		/>
		<InputGroup
			label="Time"
			value={editorDraftState.time}
			type="number"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setEditorDraftState({
					...editorDraftState,
					time: parseInt(e.target.value),
				})
			}
		/>
		<InputGroup
			label="Is level unlocked"
			value={"isUnlocked"}
			type="checkbox"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setEditorDraftState({
					...editorDraftState,
					isUnlocked: false,
				})
			}
		/>
		<InputGroup
			label="Bricks needed to unlock"
			value={editorDraftState.bricksNeeded}
			type="number"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setEditorDraftState({
					...editorDraftState,
					bricksNeeded: parseInt(e.target.value),
				})
			}
		/>

		<div className={styles.inputGroup}>
			<InputGroup
				label="World"
				value={editorDraftState.worldNumber}
				type="number"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setEditorDraftState({
						...editorDraftState,
						worldNumber: parseInt(e.target.value),
					})
				}
			/>
			<InputGroup
				label="Level"
				value={editorDraftState.levelNumber}
				type="number"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setEditorDraftState({
						...editorDraftState,
						levelNumber: parseInt(e.target.value),
					})
				}
			/>
		</div>
	</section>
);

export default LevelInventory;
