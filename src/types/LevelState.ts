import { Tables } from "./Tables";
import { BrickType } from "./Bricks";
import { EditorDraftState } from "../editor/components/Editor";
import { Dispatch, SetStateAction } from "react";

export type LevelState = {
	timer: number;
	rows: number;
	score: number;
	bricks: BrickType[];
	mapping: BrickType[][];
	tables: any;
	answers: Tables[];
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
