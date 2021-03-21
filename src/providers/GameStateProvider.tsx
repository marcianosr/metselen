import React, { createContext } from "react";
import { tables, getRandomTable } from "../data/tables";
import { GameState } from "../types/GameState";
import { bricksMapping } from "../components/BrickContainer";
import { flattenBricksArray } from "../utils";

const amountOfSums = flattenBricksArray(bricksMapping).length;

// T represents a key of the GameState Type
// GameState[T] resolves to a type value.
//
// GameState[T]: isGameFinished (key) that belongs to GameState type. This is adding constraints, so you won't accidently update an unknown object.
type GameStateUpdater = <T extends keyof GameState>(
	key: T,
	value: GameState[T]
) => void;
type GameStateMultipleUpdater = (state: Partial<GameState>) => void;

const allTables = [...Array(amountOfSums)].map((_, i) => ({
	id: i + 1,
	...getRandomTable(tables),
}));

type GameStateContextState = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
	onResetGame: () => void;
	updateGameState: GameStateUpdater;
	updateGameStateMultiple: GameStateMultipleUpdater;
};

const INITIAL_GAME_STATE: GameState = {
	timer: 7,
	score: 0,
	tables: allTables,
	correctAnswers: [],
	isGameFinished: false,
};

export const GameStateContext = createContext<GameStateContextState>({
	gameState: INITIAL_GAME_STATE,
	setGameState: () => {},
	onResetGame: () => {},
	updateGameState: () => {},
	updateGameStateMultiple: () => {},
});

export const GameStateProvider: React.FC = ({ children }) => {
	const [gameState, setGameState] = React.useState<GameState>({
		...INITIAL_GAME_STATE,
	});

	const updateGameState: GameStateUpdater = (key, value) => {
		setGameState({
			...gameState,
			[key]: value,
		});
	};

	const updateGameStateMultiple: GameStateMultipleUpdater = (state) => {
		setGameState({
			...gameState,
			...state,
		});
	};

	const reset = () => setGameState({ ...INITIAL_GAME_STATE });

	return (
		<GameStateContext.Provider
			value={{
				gameState,
				setGameState,
				onResetGame: reset,
				updateGameState,
				updateGameStateMultiple,
			}}
		>
			{children}
		</GameStateContext.Provider>
	);
};

export const useGameState = (): GameStateContextState =>
	React.useContext(GameStateContext);
