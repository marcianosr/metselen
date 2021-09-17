import React from "react";
import { EditorDraftStateProps } from "../../../types/LevelState";
import Input from "../Input";

import styles from "./styles.module.css";
import AssignmentRadioButtonGroup from "../AssignmentRadioButtonGroup";

const LevelInventory: React.FC<EditorDraftStateProps> = ({
	editorDraftState,
	setEditorDraftState,
}) => (
	<section>
		<Input
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
		<Input
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
		<Input
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
		<Input
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

		<AssignmentRadioButtonGroup
			editorDraftState={editorDraftState}
			setEditorDraftState={setEditorDraftState}
		/>

		<div className={styles.inputGroup}>
			<Input
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
			<Input
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
