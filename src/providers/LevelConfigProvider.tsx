import React, { createContext, useState } from "react";
import { BrickType } from "../types/Bricks";

// The new Level Type

type Layout = {
	order: number;
	bricks: BrickType[];
};

type LevelConfigState = {
	name: string;
	level: number;
	columns: number;
	layout: Layout[];
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
	updateLeveConfigState: LevelStateUpdater;
	updateLeveConfigStateMultiple: LevelStateMultipleUpdater;
};

type LevelConfigStateProps = {};

const INITIAL_LEVEL_STATE: LevelConfigState = {
	name: "Untitled",
	level: 0,
	columns: 1,
	layout: [
		{
			order: 3,
			bricks: [
				{ id: 1, size: "medium", willDrop: true, cracked: false },
				{ id: 2, size: "medium", willDrop: true, cracked: false },
				{ id: 3, size: "medium", willDrop: true, cracked: false },
				{ id: 4, size: "medium", willDrop: true, cracked: false },
				{ id: 5, size: "small", willDrop: true, cracked: false },
			],
		},
		{
			order: 2,
			bricks: [
				{ id: 1, size: "veryLarge", willDrop: true, cracked: false },
				{ id: 2, size: "small", willDrop: true, cracked: false },
			],
		},
		{
			order: 1,
			bricks: [
				{ id: 1, size: "large", willDrop: true, cracked: false },
				{ id: 2, size: "small", willDrop: true, cracked: false },
			],
		},
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
		setLevelConfigState: () => {},
		updateLeveConfigState: () => {},
		updateLeveConfigStateMultiple: () => {},
	});

export const LevelConfigStateProvider: React.FC<LevelConfigStateProps> = ({
	children,
}) => {
	const [levelConfigState, setLevelConfigState] =
		useState<LevelConfigState>(INITIAL_LEVEL_STATE);

	const updateLeveConfigState: LevelStateUpdater = (key, value) => {
		setLevelConfigState({
			...levelConfigState,
			[key]: value,
		});
	};

	const updateLeveConfigStateMultiple: LevelStateMultipleUpdater = (
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
				updateLeveConfigState,
				updateLeveConfigStateMultiple,
			}}
		>
			{children}
		</LevelConfigStateContext.Provider>
	);
};

export const useLevelConfigState = (): LevelConfigStateContextState =>
	React.useContext(LevelConfigStateContext);
