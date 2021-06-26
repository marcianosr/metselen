import React, { createContext, useState } from "react";
import { BrickType } from "../types/Bricks";

export type BrickPosition = BrickType & {
	x: number;
	y: number
}

type LevelConfigState = {
	name: string;
	level: number;
	layout: BrickPosition[],
	ranges: {
		multiplication: number[];
		tables: number[];
	};
	time: number;
};

// T represents a key of the LevelState Type
// LevelState[Action] resolves to a type value.
//
// LevelState[Action]: isGameFinished (key) that belongs to LevelState type. This is adding constraints, so you won't accidently update an unknown object.
type LevelStateUpdater = <Action extends keyof LevelConfigState>(
	key: Action,
	value: LevelConfigState[Action]
) => void;
type LevelStateMultipleUpdater = (state: Partial<LevelConfigState>) => void;

type LevelConfigStateContextState = {
	levelConfigState: LevelConfigState;
	setLevelConfigState: (levelState: LevelConfigState) => void;
	updateLevelConfigState: LevelStateUpdater;
	updateLevelConfigStateMultiple: LevelStateMultipleUpdater;
};

type LevelConfigStateProps = {};

const INITIAL_LEVEL_STATE: LevelConfigState = {
	name: "Untitled",
	level: 0,
	layout: [
		{ id: 1, size: "large", willDrop: true, cracked: false, x: 1, y: 2 },
		{ id: 2, size: "medium", willDrop: true, cracked: false, x: 1, y: 0 },
		{ id: 3, size: "medium", willDrop: true, cracked: false, x: 2, y: 0 },
		{ id: 4, size: "medium", willDrop: true, cracked: false, x: 3, y: 0 },
		{ id: 5, size: "medium", willDrop: true, cracked: false, x: 4, y: 0 },
		{ id: 6, size: "medium", willDrop: true, cracked: false, x: 5, y: 0 },
	],
	ranges: {
		multiplication: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		tables: [1],
	},
	time: 10,
};

export const LevelConfigStateContext =
	createContext<LevelConfigStateContextState>({
		levelConfigState: INITIAL_LEVEL_STATE,
		setLevelConfigState: () => { },
		updateLevelConfigState: () => { },
		updateLevelConfigStateMultiple: () => { },
	});

export const LevelConfigStateProvider: React.FC<LevelConfigStateProps> = ({
	children,
}) => {
	const [levelConfigState, setLevelConfigState] =
		useState<LevelConfigState>(INITIAL_LEVEL_STATE);

	const updateLevelConfigState: LevelStateUpdater = (key, value) => {
		setLevelConfigState({
			...levelConfigState,
			[key]: value,
		});
	};

	const updateLevelConfigStateMultiple: LevelStateMultipleUpdater = (
		state
	) => {
		setLevelConfigState({
			...levelConfigState,
			...state,
		});
	};

	console.log("levelConfigState", levelConfigState);

	return (
		<LevelConfigStateContext.Provider
			value={{
				levelConfigState,
				setLevelConfigState,
				updateLevelConfigState,
				updateLevelConfigStateMultiple,
			}}
		>
			{children}
		</LevelConfigStateContext.Provider>
	);
};

export const useLevelConfigState = (): LevelConfigStateContextState =>
	React.useContext(LevelConfigStateContext);
