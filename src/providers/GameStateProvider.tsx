import React, { createContext } from "react";
import { tables, getRandomTable } from "../data/tables";
import { GameState } from "../types/GameState";
import { bricksMapping } from "../components/BrickContainer";
import { flattenBricksArray } from "../utils";

const amountOfSums = flattenBricksArray(bricksMapping).length;

const allTables = [...Array(amountOfSums)].map((_, i) => ({
	id: i + 1,
	...getRandomTable(tables),
}));

type GameStateContextState = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
	onResetGame: () => void; // Refactor later.
};

const INITIAL_GAME_STATE: GameState = {
	timer: null,
	tables: allTables,
	correctAnswers: [],
	isGameFinished: false,
};

export const GameStateContext = createContext<GameStateContextState>({
	gameState: INITIAL_GAME_STATE,
	setGameState: () => {},
	onResetGame: () => {},
});

export const GameStateProvider: React.FC = ({ children }) => {
	const [gameState, setGameState] = React.useState<GameState>({
		...INITIAL_GAME_STATE,
	});

	const onResetGame = () => setGameState({ ...INITIAL_GAME_STATE });

	return (
		<GameStateContext.Provider
			value={{ gameState, setGameState, onResetGame }}
		>
			{children}
		</GameStateContext.Provider>
	);
};

export const useGameState = (): GameStateContextState =>
	React.useContext(GameStateContext);
