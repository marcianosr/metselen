import React from "react";
import { EditorDraftStateProps } from "../../../types/LevelState";
import InputGroup from "../InputGroup";

const WorldInventory: React.FC<EditorDraftStateProps> = ({
	editorDraftState,
	setEditorDraftState,
}) => (
	<section>
		<InputGroup
			label="World name"
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
			label="Is world unlocked"
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
	</section>
);

export default WorldInventory;
