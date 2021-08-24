import React, { createContext, useState } from "react";
import { getRandomBrickColor } from "../components/BrickContainer";
import { BrickType } from "../types/Bricks";

export type BrickPosition = BrickType & {
	x: number;
	y: number;
};

export type EditorState = {
	name: string;
	worldNumber: number;
	levelNumber: number;
	layout: BrickPosition[];
	ranges: {
		multiplication: number[];
		tables: number[];
	};
	time: number;
	isUnlocked: boolean;
	maxBricks: number;
	bricksNeeded: number;
	type: "level" | "world";
};

// T represents a key of the EditorState Type
// EditorState[Action] resolves to a type value.
//
// EditorState[Action]: isGameFinished (key) that belongs to EditorState type. This is adding constraints, so you won't accidently update an unknown object.
type EditorStateUpdater = <Action extends keyof EditorState>(
	key: Action,
	value: EditorState[Action]
) => void;
type EditorStateMultipleUpdater = (state: Partial<EditorState>) => void;

type EditorStateContextState = {
	editorState: EditorState;
	setEditorState: (levelState: EditorState) => void;
	updateEditorState: EditorStateUpdater;
	updateEditorStateMultiple: EditorStateMultipleUpdater;
	cleanEditorState: () => void;
};

type EditorStateProps = {};

const INITIAL_LEVEL_STATE: EditorState = {
	name: "untitled",
	worldNumber: 1,
	levelNumber: 0,
	layout: [
		{
			id: 1,
			size: "large",
			willDrop: true,
			cracked: false,
			x: 1,
			y: 2,
			color: getRandomBrickColor(),
		},
	],
	ranges: {
		multiplication: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		tables: [1],
	},
	time: 10,
	isUnlocked: false,
	maxBricks: 0,
	bricksNeeded: 0,
	type: "level",
};

export const EditorStateContext = createContext<EditorStateContextState>({
	editorState: INITIAL_LEVEL_STATE,
	setEditorState: () => {},
	updateEditorState: () => {},
	updateEditorStateMultiple: () => {},
	cleanEditorState: () => {},
});

export const EditorStateProvider: React.FC<EditorStateProps> = ({
	children,
}) => {
	const [editorState, setEditorState] =
		useState<EditorState>(INITIAL_LEVEL_STATE);

	const updateEditorState: EditorStateUpdater = (key, value) => {
		console.log("key", key);
		setEditorState({
			...editorState,
			[key]: value,
		});
	};

	const updateEditorStateMultiple: EditorStateMultipleUpdater = (state) => {
		setEditorState({
			...editorState,
			...state,
		});
	};

	const cleanEditorState = () => {
		setEditorState(INITIAL_LEVEL_STATE);
	};

	return (
		<EditorStateContext.Provider
			value={{
				editorState,
				setEditorState,
				updateEditorState,
				updateEditorStateMultiple,
				cleanEditorState,
			}}
		>
			{children}
		</EditorStateContext.Provider>
	);
};

export const useEditorState = (): EditorStateContextState =>
	React.useContext(EditorStateContext);
