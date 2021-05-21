import { World } from "../data/worlds";

export type GameState = {
	worlds: World[];
};

export type GameStateProps = {
	gameState: GameState;
	setGameState: (gameState: GameState) => void;
};
