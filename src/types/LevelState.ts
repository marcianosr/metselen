import { Dispatch, SetStateAction } from "react";
import { AssignmentFormatWithId } from "./AssignmentFormatWithId";
import { BrickType } from "./Bricks";
import { EditorDraftState } from "../editor/components/Editor";

export type LevelState = {
	timer: number;
	rows: number;
	score: number;
	bricks: BrickType[];
	mapping: BrickType[][];
	assignments: any;
	answers: AssignmentFormatWithId[];
	isGameFinished: boolean;
	amountOfBricksOnField: number;
	currentAnswer: string | null;
};

export type LevelStateProps = {
	levelState: LevelState;
	setLevelState: (levelState: LevelState) => void;
};

export type EditorDraftStateProps = {
	editorDraftState: EditorDraftState;
	setEditorDraftState: Dispatch<SetStateAction<EditorDraftState>>;
};
