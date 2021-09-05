import React, { FC, Fragment } from "react";
import Input from "../Input";
import { MathAssignment } from "../../../types/Assignment";
import { EditorDraftStateProps } from "../../../types/LevelState";
import styles from "./styles.module.css";

const AssignmentRadioButtonGroup: FC<EditorDraftStateProps> = ({
	editorDraftState,
	setEditorDraftState,
}) => {
	return (
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
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => {
								setEditorDraftState({
									...editorDraftState,
									assignments: {
										[e.target.value]: {
											base: [
												...(editorDraftState
													.assignments[e.target.value]
													?.base || [1]),
											],
											modifier: [
												...(editorDraftState
													.assignments[e.target.value]
													?.modifier || [
													1, 2, 3, 4, 5, 6, 7, 8, 9,
													10,
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
};

export default AssignmentRadioButtonGroup;
