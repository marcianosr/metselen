import React from "react";
import { EditorDraftStateProps } from "../../../types/LevelState";
import Input from "../Input";

const WorldInventory: React.FC<EditorDraftStateProps> = ({
	editorDraftState,
	setEditorDraftState,
}) => (
	<section>
		<Input
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
		<Input
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
	</section>
);

export default WorldInventory;
