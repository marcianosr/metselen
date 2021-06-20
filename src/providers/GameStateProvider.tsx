import React, { createContext } from "react";
import { GameState } from "../types/GameState";
import { worlds } from "../data/worldsConfig";

// T represents a key of the gameState Type
// gameState[Action] resolves to a type value.
//
// gameState[Action]: isGameFinished (key) that belongs to gameState type. This is adding constraints, so you won't accidently update an unknown object.
type GameStateUpdater = <Action extends keyof GameState>(
	key: Action,
	value: GameState[Action]
) => void;
type GameStateMultipleUpdater = (state: Partial<GameState>) => void;

type GameStateContextState = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
	updateGameState: GameStateUpdater;
	updateGameStateMultiple: GameStateMultipleUpdater;
};

const INITIAL_GAME_STATE = {
	worlds,
	currentWorld: 1,
	currentLevel: 1,
	// Refactor screen changes  to it's own provider
	screen: {
		current: "enterName",
	},
	mode: "editor",
};

export const GameStateContext = createContext<GameStateContextState>({
	gameState: INITIAL_GAME_STATE,
	setGameState: () => {},
	updateGameState: () => {},
	updateGameStateMultiple: () => {},
});

export const GameStateProvider: React.FC = ({ children }) => {
	const [gameState, setGameState] = React.useState<GameState>({
		worlds,
		currentWorld: INITIAL_GAME_STATE.currentWorld,
		currentLevel: INITIAL_GAME_STATE.currentLevel,
		screen: {
			current: "enterName",
		},
		mode: "editor",
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

	console.log("gameState", gameState);

	return (
		<GameStateContext.Provider
			value={{
				gameState,
				setGameState,
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
