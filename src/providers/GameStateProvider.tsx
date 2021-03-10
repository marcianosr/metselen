import React, { createContext } from "react";
import { tables, getRandomTable } from "../data/tables";
import { GameState } from "../types/GameState";

const times = 6; // sould be leading for the generation of bricks
const allTables = [...Array(times)].map((_, i) => ({
	id: i + 1,
	...getRandomTable(tables),
}));

type GameStateContextState = {
	gameState: GameState;
	setGameState: any;
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
});

export const GameStateProvider: React.FC = ({ children }) => {
	const [gameState, setGameState] = React.useState<GameState>({
		...INITIAL_GAME_STATE,
	});

	return (
		<GameStateContext.Provider value={{ gameState, setGameState }}>
			{children}
		</GameStateContext.Provider>
	);
};

export const useGameState = (): GameStateContextState =>
	React.useContext(GameStateContext);
