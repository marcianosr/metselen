import React, { createContext } from "react";
import { tables, getRandomTable } from "../data/tables";
import { LevelState } from "../types/LevelState";
import { flattenBricksArray } from "../utils";
import { levels } from "../data/levelMappings";

const amountOfSums = flattenBricksArray(levels[0].layout).length;

// T represents a key of the LevelState Type
// LevelState[Action] resolves to a type value.
//
// LevelState[Action]: isGameFinished (key) that belongs to LevelState type. This is adding constraints, so you won't accidently update an unknown object.
type LevelStateUpdater = <Action extends keyof LevelState>(
	key: Action,
	value: LevelState[Action]
) => void;
type LevelStateMultipleUpdater = (state: Partial<LevelState>) => void;

const allTables = [...Array(amountOfSums)].map((_, i) => ({
	id: i + 1,
	...getRandomTable(tables),
}));

type LevelStateContextState = {
	levelState: LevelState;
	setLevelState: (levelState: LevelState) => void;
	onResetLevel: () => void;
	updateLevelState: LevelStateUpdater;
	updateLevelStateMultiple: LevelStateMultipleUpdater;
};

const INITIAL_LEVEL_STATE: LevelState = {
	timer: 9700,
	score: 0,
	rows: 0,
	tables: allTables,
	answers: [],
	bricks: flattenBricksArray(levels[0].layout),
	mapping: levels[0].layout,
	isGameFinished: false,
	amountOfBricksOnField: 0,
	currentAnswer: null,
};

export const LevelStateContext = createContext<LevelStateContextState>({
	levelState: INITIAL_LEVEL_STATE,
	setLevelState: () => {},
	onResetLevel: () => {},
	updateLevelState: () => {},
	updateLevelStateMultiple: () => {},
});

export const LevelStateProvider: React.FC = ({ children }) => {
	const [levelState, setLevelState] = React.useState<LevelState>({
		...INITIAL_LEVEL_STATE,
	});

	const updateLevelState: LevelStateUpdater = (key, value) => {
		setLevelState({
			...levelState,
			[key]: value,
		});
	};

	const updateLevelStateMultiple: LevelStateMultipleUpdater = (state) => {
		setLevelState({
			...levelState,
			...state,
		});
	};

	console.log("levelState", levelState);

	const reset = () => setLevelState({ ...INITIAL_LEVEL_STATE });

	return (
		<LevelStateContext.Provider
			value={{
				levelState,
				setLevelState,
				onResetLevel: reset,
				updateLevelState,
				updateLevelStateMultiple,
			}}
		>
			{children}
		</LevelStateContext.Provider>
	);
};

export const useLevelState = (): LevelStateContextState =>
	React.useContext(LevelStateContext);
