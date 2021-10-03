import React, { FC, Fragment } from "react";
import Input from "../Input";
import { MathAssignment } from "../../../types/Assignment";
import { EditorDraftStateProps } from "../../../types/LevelState";
import styles from "./styles.module.css";

const isChecked = (selected: string, key: string): boolean => selected === key;

const AssignmentRadioButtonGroup: FC<EditorDraftStateProps> = ({
	editorDraftState,
	setEditorDraftState,
}) => (
	<>
		<h3>Assignment type</h3>
		<div className={styles.assignmentGroup}>
			{Object.values(MathAssignment).map((key) => (
				<Fragment key={key}>
					<Input
						label={key}
						value={key}
						id={key}
						name="assignment"
						type="radio"
						checked={isChecked(
							Object.keys(editorDraftState.assignmentSettings)[0],
							key
						)}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const selectedValue = e.target
								.value as MathAssignment; // “trust me, I know what I’m doing”

							setEditorDraftState({
								...editorDraftState,
								assignmentSettings: {
									[e.target.value]: {
										base: [
											...(editorDraftState
												.assignmentSettings[
												selectedValue
											]?.base || [1]),
										],
										modifier: [
											...(editorDraftState
												.assignmentSettings[
												selectedValue
											]?.modifier || [
												1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
											]),
										],
									},
								},
							});
						}}
					/>
				</Fragment>
			))}
		</div>
	</>
);

export default AssignmentRadioButtonGroup;
